import { program } from "@commander-js/extra-typings";
import { } from "helpers/src/clients/github";
program
  .argument("<project>")
  // .description("")
  .action(async () => {
    // console.log("options", project);
  });
