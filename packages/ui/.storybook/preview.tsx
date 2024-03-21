import type { Preview } from "@storybook/react";
import React, { useEffect, useLayoutEffect } from "react";
import { evmos, nb } from "../src/fonts";
// @ts-expect-error - I'm not sure why if I import it the normal way, storybook doesn't pick it up, so I'm importing it with this syntax
import("../src/global.css");

const preview: Preview = {
  decorators: [
    (Story, args) => {
      useEffect(() => {
        document
          .querySelector("html")
          ?.classList.add(evmos.variable, nb.variable);

        document.body.classList.add(
          "bg-background",
          "dark:bg-background-dark",
          "dark:text-paragraph-dark",
          "text-paragraph",
          "font-body",
        );
      }, []);

      useLayoutEffect(() => {
        document
          .querySelector("html")
          ?.classList.toggle("dark", args.globals.darkMode);
      }, [args.globals.darkMode]);

      return Story();
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },

    theme: {
      default: "light",
      values: [],
    },
  },
  globalTypes: {
    darkMode: {
      description: "Dark mode",
      defaultValue: true,
      type: "boolean",
      toolbar: {
        items: [
          { icon: "sun", value: false, title: "light" },
          { icon: "moon", value: true, title: "dark" },
        ],
      },
    },
  },
};

export default preview;
