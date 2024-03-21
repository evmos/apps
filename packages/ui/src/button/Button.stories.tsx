// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import type { Meta, StoryObj } from "@storybook/react";
import { IconHeart } from "../icons/line";
import { Button } from ".";
import { Fragment } from "react";
const variants = [
  "primary",
  "secondary",
  "tertiary",
  "low-emphasis",
  "danger",
] as const;
const meta = {
  title: "Buttons",
  component: Button,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Buttons: Story = {
  render: (props) => {
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
              <Button {...props} variant={variant} size="sm">
                Button
              </Button>
            </div>
            <div>
              <Button {...props} variant={variant} size="sm" outlined>
                Button
              </Button>
            </div>
            <div>
              <Button {...props} variant={variant} size="sm" ghost>
                Button
              </Button>
            </div>

            <div>
              <Button {...props} variant={variant} size="sm" tight>
                Button
              </Button>
            </div>
            <div>{'size="md"'}</div>
            <div>
              <Button {...props} variant={variant}>
                Button
              </Button>
            </div>
            <div>
              <Button {...props} variant={variant} outlined>
                Button
              </Button>
            </div>
            <div>
              <Button {...props} variant={variant} ghost>
                Button
              </Button>
            </div>
            <div>
              <Button {...props} variant={variant} tight>
                Button
              </Button>
            </div>
            <div>{'size="lg"'}</div>
            <div>
              <Button {...props} variant={variant} size="lg">
                Button
              </Button>
            </div>
            <div>
              <Button {...props} variant={variant} size="lg" outlined>
                Button
              </Button>
            </div>
            <div>
              <Button {...props} variant={variant} size="lg" ghost>
                Button
              </Button>
            </div>

            <div>
              <Button {...props} variant={variant} size="lg" tight>
                Button
              </Button>
            </div>
            <div>{"disabled"}</div>
            <div>
              <Button {...props} variant={variant} disabled>
                Button
              </Button>
            </div>
            <div>
              <Button {...props} variant={variant} disabled outlined>
                Button
              </Button>
            </div>
            <div>
              {" "}
              <Button {...props} variant={variant} disabled ghost>
                Button
              </Button>
            </div>

            <div>
              <Button {...props} variant={variant} disabled tight>
                Button
              </Button>
            </div>
            <div>{"leading icon"}</div>
            <div>
              <Button {...props} variant={variant}>
                <IconHeart /> Button
              </Button>
            </div>
            <div>
              <Button {...props} variant={variant} outlined>
                <IconHeart /> Button
              </Button>
            </div>
            <div>
              <Button {...props} variant={variant} ghost>
                <IconHeart /> Button
              </Button>
            </div>
            <div>
              <Button {...props} variant={variant} tight>
                <IconHeart /> Button
              </Button>
            </div>
          </Fragment>
        ))}
      </div>
    );
  },
};
