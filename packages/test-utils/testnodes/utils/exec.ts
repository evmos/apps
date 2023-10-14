import { exec as childProcessExec } from "node:child_process";

export const exec = (command: string) =>
  new Promise<string>((resolve, reject) => {
    console.log("exec", command);
    childProcessExec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
