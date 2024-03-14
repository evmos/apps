import type { Preview } from "@storybook/react";
// @ts-ignore
import("../src/global.css");

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
