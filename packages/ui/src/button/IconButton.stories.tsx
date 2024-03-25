// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import type { Meta, StoryObj } from "@storybook/react";
import * as icons from "../icons/line";
import { Button } from ".";
import { Fragment } from "react";
import { IconButton } from "./icon-button";
const variants = [
  "primary",
  "secondary",
  "tertiary",
  "low-emphasis",
  "danger",
] as const;
const meta = {
  title: "IconButtons",
  component: Button,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const IconButtons: Story = {
  args: {
    icon: "IconElements",
  },
  argTypes: {
    icon: {
      options: Object.keys(icons),
      control: { type: "select" },
    },
  },
  render: (props) => {
    const Icon = icons[props.icon as keyof typeof icons];
    return (
      <div className="grid text-center grid-cols-5 gap-4 [&>*]:flex [&>*]:items-center [&>*]:justify-center">
        {variants.map((variant) => (
          <Fragment key={variant}>
            <div className="col-span-5 h-14">{variant}</div>
            <div></div>
            <div></div>
            <div>outlined</div>
            <div>ghost</div>
            <div>tight</div>
            <div>{'size="sm"'}</div>
            <div>
              <IconButton {...props} variant={variant} size="sm">
                <Icon />
              </IconButton>
            </div>
            <div>
              <IconButton {...props} variant={variant} size="sm" outlined>
                <Icon />
              </IconButton>
            </div>
            <div>
              <IconButton {...props} variant={variant} size="sm" ghost>
                <Icon />
              </IconButton>
            </div>

            <div>
              <IconButton {...props} variant={variant} size="sm" tight>
                <Icon />
              </IconButton>
            </div>
            <div>{'size="md"'}</div>
            <div>
              <IconButton {...props} variant={variant}>
                <Icon />
              </IconButton>
            </div>
            <div>
              <IconButton {...props} variant={variant} outlined>
                <Icon />
              </IconButton>
            </div>
            <div>
              <IconButton {...props} variant={variant} ghost>
                <Icon />
              </IconButton>
            </div>
            <div>
              <IconButton {...props} variant={variant} tight>
                <Icon />
              </IconButton>
            </div>
            <div>{'size="lg"'}</div>
            <div>
              <IconButton {...props} variant={variant} size="lg">
                <Icon />
              </IconButton>
            </div>
            <div>
              <IconButton {...props} variant={variant} size="lg" outlined>
                <Icon />
              </IconButton>
            </div>
            <div>
              <IconButton {...props} variant={variant} size="lg" ghost>
                <Icon />
              </IconButton>
            </div>

            <div>
              <IconButton {...props} variant={variant} size="lg" tight>
                <Icon />
              </IconButton>
            </div>
            <div>{"disabled"}</div>
            <div>
              <IconButton {...props} variant={variant} disabled>
                <Icon />
              </IconButton>
            </div>
            <div>
              <IconButton {...props} variant={variant} disabled outlined>
                <Icon />
              </IconButton>
            </div>
            <div>
              <IconButton {...props} variant={variant} disabled ghost>
                <Icon />
              </IconButton>
            </div>

            <div>
              <IconButton {...props} variant={variant} disabled tight>
                <Icon />
              </IconButton>
            </div>
            <div>{"rect"}</div>
            <div>
              <IconButton {...props} variant={variant} rect>
                <Icon />
              </IconButton>
            </div>
            <div>
              <IconButton {...props} variant={variant} outlined rect>
                <Icon />
              </IconButton>
            </div>
            <div>
              <IconButton {...props} variant={variant} ghost rect>
                <Icon />
              </IconButton>
            </div>
            <div>
              <IconButton {...props} variant={variant} tight rect>
                <Icon />
              </IconButton>
            </div>
          </Fragment>
        ))}
      </div>
    );
  },
};
