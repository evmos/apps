/**
 * @type {{
 *   name:string,
 *   version?:string,
 *   devDependencies?:Record<string,string>,
 *   dependencies?:Record<string,string>,
 *   peerDependencies?:Record<string,string>,
 * }}
 **/

const modulePackageJson = (
  await import(`${process.cwd()}/package.json`, {
    assert: {
      type: "json",
    },
  })
).default;

/** @type {import('next').NextConfig['i18n'] & {}}} */
let i18n = {
  defaultLocale: "en",
  locales: ["en"],
};
try {
  i18n = (await import(`${process.cwd()}/next-i18next.config.js`)).default.i18n;
} catch (e) {}

/** @type {(config?:import('next').NextConfig) => import('next').NextConfig} */
export function withEvmosConfig(config = {}) {
  const transpilePackages = Object.entries(
    Object.assign(
      {},
      modulePackageJson.dependencies,
      modulePackageJson.devDependencies,
      modulePackageJson.peerDependencies
    )
  ).reduce((acc, [key, value]) => {
    if (value.startsWith("workspace:")) {
      acc.add(key);
    }
    return acc;
  }, new Set());
  transpilePackages.delete("@evmos-apps/config");
  transpilePackages.delete("tailwind-config");
  transpilePackages.delete("playwright-config-custom");

  return {
    images: {
      domains: ["storage.evmos.org"],
    },
    i18n,
    eslint: {
      ignoreDuringBuilds: true,
    },
    publicRuntimeConfig: {
      version: modulePackageJson.version,
    },
    transpilePackages: [...transpilePackages],
    ...config,
  };
}
