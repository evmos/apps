import { program } from "@commander-js/extra-typings";
import chalk from "chalk";
import $ from "dax-sh";
import { simpleGit } from "simple-git";
import { Log } from "helpers/src/logger";
import getReleasePlan from "@changesets/get-release-plan";
import { REPO_ROOT } from "../utils/constants";
import { inspect } from "util";
import memoize from "lodash-es/memoize";
import { Octokit } from "octokit";

const logger = Log("release");

// Clear GITHUB_TOKEN from the environment
// Because Octokit will prioritize it, but the token from .env doesn't have
// the necessary permissions
// we need to use the token from `gh` instead
delete process.env.GITHUB_TOKEN;

const getGithubClient = async () => {
  try {
    const githubToken = await $`gh auth token`.text();
    return new Octokit({
      auth: githubToken,
    });
  } catch (e) {
    logger.error(
      [
        `This release script requires GitHub Cli to be installed and authenticated.`,
        "",
        'Check https://cli.github.com/ for more information on how to set it up.',
      ].join("\n"),
    );
  }
};

export const github = await getGithubClient(); 

const getProjectReleasePlan = memoize(async (project: string) => {
  const releasePlan = await getReleasePlan(REPO_ROOT);

  const projectRelease = releasePlan.releases.find(
    (release) => release.name === project,
  );
  if (!projectRelease) {
    logger.error(
      [
        "",
        chalk.red.bold(
          `Error: Project \`${project}\` not found in release plan`,
        ),
        "",
        "There seems to be no changeset that affects the project or it's dependencies",
        "",
        "Possible reasons:",
        "- The project name is incorrect",
        `- There are no changesets added to \`${project}\``,
        `- There are no changesets added to a dependency of \`${project}\``,
        `- dependencies marked as devDependency do not bump \`${project}\` version`,
        `- global dependencies (root dependencies for example) do not bump \`${project}\` version`,
      ].join("\n"),
    );
    process.exit(1);
  }
  return { ...releasePlan, projectRelease };
});
const getSummary = async (project: string) => {
  const releasePlan = await getProjectReleasePlan(project);

  const changesetMap = releasePlan.changesets.reduce((acc, changeset) => {
    acc[changeset.id] = changeset;
    return acc;
  }, {});

  const changes = releasePlan.releases.flatMap(
    ({ name, newVersion, type, changesets }) => [
      `${type.toLocaleUpperCase()} ${name}@${newVersion}`,
      ...changesets.map((id) => {
        const changeset = changesetMap[id];
        return `- ${changeset.summary}`;
      }),
      "",
    ],
  );

  return changes.join("\n");
};

const getReleaseBranchName = async (project: string) => {
  const releasePlan = await getProjectReleasePlan(project);
  const version = releasePlan.projectRelease.newVersion;

  return `release/${project}/${version}`;
};

const git = simpleGit();
const assertNoUncommittedChanges = async () => {
  const status = await git.status();
  if (status.files.length > 0) {
    logger.error(
      [
        "",
        chalk.red.bold("Error: Uncommitted changes detected"),
        "",
        "Please commit or stash your changes before proceeding",
        "",
        inspect(status.files, { colors: true, depth: 10 }),
      ].join("\n"),
    );
    process.exit(1);
  }
};

const createReleaseBranch = async (project: string) => {
  const branch = await getReleaseBranchName(project);
  await assertNoUncommittedChanges();
  await git.checkoutBranch(branch, "julia/changeset");
  // await git.checkoutBranch(branch, "origin/main");
};

const fetchMainBranch = async () => {
  return await git.fetch("origin", "main");
};

const consumeChangesets = async () => {
  await $`pnpm changeset version`;
};

const commitRelease = async (project: string) => {
  const releasePlan = await getProjectReleasePlan(project);
  const version = releasePlan.projectRelease.newVersion;
  await git.add(".");
  await git.commit(`chore: release ${project}@${version}`, ["--no-verify"]);
};

const pushReleaseBranch = async (project: string) => {
  const branch = await getReleaseBranchName(project);
  await git.push(["-u", "origin", branch, "-f"]);
};

const createReleasePr = async (project: string, baseBranch: string) => {
  const releasePlan = await getProjectReleasePlan(project);
  const summary = await getSummary(project);
  const version = releasePlan.projectRelease.newVersion;

  return await github.rest.pulls.create({
    owner: "evmos",
    repo: "apps",
    title: `Release ${project}: ${version}`,
    body: summary,
    base: baseBranch,
    head: await getReleaseBranchName(project),
    draft: true,
  });
};

const getCurrentBranch = async () => {
  const status = await git.status();
  return status.current ?? "main";
};

const deleteReleaseBranch = async (project: string) => {
  const branch = await getReleaseBranchName(project);
  await git.deleteLocalBranch(branch, true);
};

program
  .argument("<project>")
  // .description("")
  .action(async (project) => {
    const currentBranch = await getCurrentBranch();
    try {
      logger.info(`Fetching origin/main`);
      await fetchMainBranch();

      logger.info(`Creating release branch for ${project}`);
      await createReleaseBranch(project);

      logger.info(`Consuming changesets`);
      await consumeChangesets();

      logger.info(`Committing release for ${project}`);
      await commitRelease(project);

      logger.info(`Pushing release branch`);
      await pushReleaseBranch(project);

      logger.info(`Creating release PRs`);
      const mainPr = await createReleasePr(project, "main");
      logger.info(` - main: ${mainPr.data.html_url}`);

      // const prodPr = await createReleasePr(project, "prod");
      // logger.info(` - prod: ${prodPr.data.html_url}`);
    } catch (e) {
      logger.error(e);
    } finally {
      logger.info(`Switching back to ${currentBranch}`);
      await git.checkout(currentBranch);

      logger.info(`Cleaning up release branch`);
      await deleteReleaseBranch(project);
    }
  });
