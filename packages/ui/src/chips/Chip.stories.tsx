// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import type { Meta, StoryObj } from "@storybook/react";
import * as icons from "../icons/line";
import { Fragment } from "react";
import { Chip } from "./Chip";
const meta = {
  title: "Chips",
  component: Chip,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

const labelText = "Label";

export const Chips: Story = {
  args: {
    //change icon
    icon: "IconCheckboxCircle",
    children: "Label",
  },
  render: (props) => {
    const Icon = icons[props.icon as keyof typeof icons];

    return (
      <div className="grid text-center grid-cols-5 gap-4 [&>*]:flex [&>*]:items-center [&>*]:justify-center">
        <Fragment key="">
          <div className="col-span-5 h-14">Chips</div>
          {/* colums */}
          <div></div>
          <div>Neutral</div>
          <div>Success</div>
          <div>Warning</div>
          <div>Error</div>
          {/* rows */}
          <div>{"Trailing Icon"}</div>
          <div>
            <Chip {...props} variant={"neutral"}>
              {labelText}
              <Icon />
            </Chip>
          </div>
          <div>
            <Chip {...props} variant={"success"}>
              {labelText}
              <Icon />
            </Chip>
          </div>
          <div>
            <Chip {...props} variant={"warning"}>
              {labelText}
              <Icon />
            </Chip>
          </div>
          <div>
            <Chip {...props} variant={"error"}>
              {labelText}
              <Icon />
            </Chip>
          </div>
        </Fragment>
      </div>
    );
  },
};
