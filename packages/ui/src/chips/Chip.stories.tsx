import type { Meta, StoryObj } from "@storybook/react";
import * as icons from "../icons/line";
import { Fragment } from "react";
import { Chip } from "./Chip";
const variants = ["trailing"] as const;
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
            {/* colums */}
            <div></div>
            <div>Neutral</div>
            <div>Success</div>
            <div>Warning</div>
            <div>Error</div>
            {/* rows */}
            <div>{"Default"}</div>
            <div>
              <Chip {...props} variant={variant} text={labelText} default>
                <Icon />
              </Chip>
            </div>
            <div>
              <Chip
                {...props}
                variant={variant}
                text={labelText}
                Success={true}
                default
              >
                <Icon />
              </Chip>
            </div>
            <div>
              <Chip
                {...props}
                variant={variant}
                text={labelText}
                Warning
                default
              >
                <Icon />
              </Chip>
            </div>
            <div>
              <Chip {...props} variant={variant} text={labelText} Error default>
                <Icon />
              </Chip>
            </div>

            <div>{"Hover"}</div>
            <div>
              <Chip {...props} variant={variant} text={labelText} hover default>
                <Icon />
              </Chip>
            </div>
            <div>
              <Chip {...props} variant={variant} text={labelText} hover Success>
                <Icon />
              </Chip>
            </div>
            <div>
              <Chip {...props} variant={variant} text={labelText} hover Warning>
                <Icon />
              </Chip>
            </div>
            <div>
              <Chip {...props} variant={variant} text={labelText} hover Error>
                <Icon />
              </Chip>
            </div>
            <div>{"Focus"}</div>
            <div>
              <Chip {...props} variant={variant} text={labelText} focus default>
                <Icon />
              </Chip>
            </div>
            <div>
              <Chip {...props} variant={variant} text={labelText} focus Success>
                <Icon />
              </Chip>
            </div>
            <div>
              <Chip {...props} variant={variant} text={labelText} focus Warning>
                <Icon />
              </Chip>
            </div>
            <div>
              <Chip {...props} variant={variant} text={labelText} focus Error>
                <Icon />
              </Chip>
            </div>
          </Fragment>
        ))}
      </div>
    );
  },
};
