// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import type { Meta, StoryObj } from "@storybook/react";

import { Alert } from "./index";
import { Button } from "../../button";
import { AlertStack } from "./alert-stack";
import { alertsManager } from "./alert-manager";
import { capitalize } from "lodash-es";
import { IconCheck } from "../../icons/line/basic";
const meta = {
  title: "Alerts",
  component: Alert,
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Alerts: Story = {
  args: {
    children: (
      <>
        <Alert.Header>Hello</Alert.Header>
        <Alert.Body>Paragraph</Alert.Body>
        <Alert.Actions>
          <Button size="sm">Action</Button>
        </Alert.Actions>
      </>
    ),
  },
};

const importLine = `import { alertsManager } from "@evmosapps/ui/components/alert";\n`;
const alertTypes = [
  "success",
  "error",
  "warning",
  "primary",
  "secondary",
  "tertiary",
] as const;
export const Manager: Story = {
  render: () => {
    return (
      <div className="px-10 flex flex-col gap-16">
        {alertTypes.map((type) => (
          <div key={type} className="gap-4 grid  grid-cols-[150px,auto]">
            <div>
              <Button
                variant={type}
                onClick={() => {
                  alertsManager.push({
                    type,
                    title: capitalize(type),
                    message: "The quick brown fox jumps over the lazy dog.",
                  });
                }}
              >
                {capitalize(type)}
              </Button>
            </div>
            <pre>
              <code>
                {[
                  importLine,
                  `alertsManager.${type}({`,
                  `  title: "Success",`,
                  `  message: "The quick brown fox jumps over the lazy dog.",`,
                  `});`,
                ].join("\n")}
              </code>
            </pre>
          </div>
        ))}

        <div className="gap-4 grid grid-cols-[150px,auto]">
          <div>
            {" "}
            <Button
              onClick={async () => {
                const prompt = alertsManager.secondary({
                  title: "Prompt",
                  message: "Want to do it?",
                  options: ["Do it"],
                });

                try {
                  if ((await prompt.done) === "Do it") {
                    prompt.update({
                      type: "success",
                      title: "You did it!",
                    });
                  }
                } catch (e) {
                  prompt.update({
                    type: "error",
                    title: (e as Error).message,
                  });
                }
              }}
            >
              Prompt
            </Button>
          </div>

          <pre>
            <code>
              {[
                importLine,
                `const prompt = alertsManager.secondary({`,
                `  title: "Prompt",`,
                `  message: "Want to do it?",`,
                `  options: ["Do it"],`,
                `});`,
                ``,
                `try {`,
                `  if ((await prompt.done) === "Do it") {`,
                `    prompt.update({`,
                `      type: "success",`,
                `      title: "You did it!",`,
                `    });`,
                `  }`,
                `} catch (e) {`,
                `  prompt.update({`,
                `    type: "error",`,
                `    title: (e as Error).message,`,
                `  });`,
                `}`,
              ].join("\n")}
            </code>
          </pre>
        </div>

        <div className="gap-4 grid grid-cols-[150px,auto]">
          <div>
            <Button
              onClick={async () => {
                const connecting = alertsManager.warning({
                  title: "Connecting...",
                  duration: Infinity, // Disable auto-dismiss
                });

                await new Promise((resolve) => setTimeout(resolve, 3000));

                connecting.update({
                  icon: IconCheck,
                  type: "success",
                  title: "Connected!",
                });
              }}
            >
              With loading
            </Button>
          </div>

          <pre>
            <code>
              {[
                `import { IconCheck } from "@evmosapps/ui/icons/filled/basic/check.tsx"`,
                importLine,

                `const connecting = alertsManager.warning({`,
                `  title: "Connecting...",`,
                `  duration: Infinity, // Disable auto-dismiss`,
                `});`,
                ``,
                `await new Promise((resolve) => setTimeout(resolve, 3000));`,
                ``,
                `connecting.update({`,
                `  icon: IconCheck,`,
                `  type: "success",`,
                `  title: "Connected!",`,
                `});`,
              ].join("\n")}
            </code>
          </pre>
        </div>

        <AlertStack />
      </div>
    );
  },
};
