// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "./Card";
import { Icon } from "../images/Icon";
import { Badge } from "../badges/Badge";
import { cn } from "helpers/src/classnames";
import Image from "next/image";
import bg from "./bg.png";
import bg2 from "./Subtract.png";
import { BadgeSkeleton } from "../badges/BadgeSkeleton";
const categories = ["Trade", "Defi", "NFT", "Wallet"];

const meta = {
  title: "Cards",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Recent: Story = {
  args: {
    children: (
      <div className="gap-1.5 flex-col flex w-96 cursor-pointer">
        <Icon />
        <h5 className="heading text-base px-0.5">dApp name</h5>
        <div className="gap-1 inline-flex">
          {categories.map((category) => (
            <Badge key={category}>{category}</Badge>
          ))}
        </div>
      </div>
    ),
  },
};

// should we create a different component for skeleton ? As I did for Badge ?
export const RecentSkeleton: Story = {
  args: {
    children: (
      <div className="gap-1.5 flex-col flex w-96 cursor-pointer ">
        <div
          className={cn(
            "relative shrink-0 w-12 h-12 aspect-square rounded-lg shadow overflow-hidden bg-surface-container-highest-dark animate-pulse",
          )}
        ></div>
        <div className="h-5 px-0.5 bg-surface-container-highest-dark rounded-full w-20 animate-pulse "></div>
        <div className="gap-1 inline-flex">
          <BadgeSkeleton />
          <BadgeSkeleton />
          <BadgeSkeleton />
          <BadgeSkeleton />
        </div>
      </div>
    ),
  },
};

export const Developer: Story = {
  args: {
    intent: "developers",
    children: (
      <div className="gap-4 w-96 flex group">
        <Icon />
        <div className="grow shrink basis-0 space-y-2">
          <h5 className="heading text-base px-0.5">dApp name</h5>
          <div className="gap-1 inline-flex">
            {categories.map((category) => (
              <Badge key={category}>{category}</Badge>
            ))}
          </div>
        </div>
        <div
          className="group-hover:flex hidden bg-surface-container-highest-dark
        rounded-full items-center px-5 py-3 text-surface-variant-light text-base font-medium leading-tight"
        >
          OPEN
        </div>
      </div>
    ),
  },
};

export const DeveloperSkeleton: Story = {
  args: {
    children: (
      <div className="gap-4 w-96 flex group">
        <div
          className={cn(
            "relative shrink-0 w-12 h-12 aspect-square rounded-lg shadow overflow-hidden bg-surface-container-highest-dark animate-pulse",
          )}
        ></div>
        <div className="grow shrink basis-0 space-y-2">
          <div className="h-5 px-0.5 bg-surface-container-highest-dark rounded-full w-20 animate-pulse"></div>
          <div className="gap-1 inline-flex">
            <BadgeSkeleton />
            <BadgeSkeleton />
            <BadgeSkeleton />
            <BadgeSkeleton />
          </div>
        </div>
      </div>
    ),
  },
};

// Im not sure how should we add the bacground image to the card
// And how to handle the width and height for it (width I guess that it will depend on the parent container, but the height i think that we have to define it?)
export const Trending: Story = {
  args: {
    intent: "trending",
    children: (
      <div className="w-60">
        <div
          className={cn(
            "relative h-[129px]",
            // gradient overlay
            " after:bg-gradient-to-t after:from-black/70 after:to-transparent after:absolute after:w-full after:h-full after:bottom-0",
          )}
        >
          <div className="w-8 h-11 relative bg-black z-10">
            <div className="w-3 h-2.5 left-[9.50px] top-[12.40px] absolute text-center text-white text-base font-brand leading-7">
              1
            </div>
          </div>
          <Image
            src={bg}
            // {...(cover
            //   ? ({
            //       src: cover.src,
            //       blurDataURL: cover.blurDataURL,
            //       placeholder: "blur",
            //     } as const)
            //   : {
            //       src: "/ecosystem/galaxy.png",
            //     })}
            alt="name"
            fill={true}
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="px-4 py-4 flex gap-4">
          <Icon />
          <h5 className="heading text-base px-0.5">dApp name</h5>
        </div>
      </div>
    ),
  },
};

export const StoryFull: Story = {
  args: {
    intent: "story",

    fullWidth: true,
    children: (
      <div
        className={cn(
          "relative h-96",
          // gradient overlay
          " after:bg-gradient-to-t after:from-black/70 after:to-transparent after:absolute after:w-full after:h-full after:bottom-0",
        )}
      >
        <Image
          src={bg}
          // {...(cover
          //   ? ({
          //       src: cover.src,
          //       blurDataURL: cover.blurDataURL,
          //       placeholder: "blur",
          //     } as const)
          //   : {
          //       src: "/ecosystem/galaxy.png",
          //     })}
          alt="name"
          fill={true}
          className="object-cover"
          sizes="100vw"
        />
        <div className="px-8 pt-8 pb-6 flex-col flex h-full z-[10] relative">
          <h6 className="text-subheading-dark grow">STORY</h6>
          <div>
            <h2 className="text-heading-dark text-xl font-medium leading-relaxed ">
              Great dApps for 2024
            </h2>
            <h3 className="text-subheading-dark text-sm">
              App description goes here
            </h3>
          </div>
        </div>
      </div>
    ),
  },
};

export const Story: Story = {
  args: {
    intent: "story",
    children: (
      <div
        className={cn(
          "relative h-[244px] w-[560px]",
          // gradient overlay
          " after:bg-gradient-to-t after:from-black/70 after:to-transparent after:absolute after:w-full after:h-full after:bottom-0",
        )}
      >
        <Image
          src={bg2}
          // {...(cover
          //   ? ({
          //       src: cover.src,
          //       blurDataURL: cover.blurDataURL,
          //       placeholder: "blur",
          //     } as const)
          //   : {
          //       src: "/ecosystem/galaxy.png",
          //     })}
          alt="name"
          fill={true}
          className="object-cover"
          sizes="100vw"
        />
        <div className="px-8 pt-8 pb-6 flex-col flex h-full z-[10] relative">
          <h6 className="text-subheading-dark text-xs grow">STORY</h6>
          <div>
            <h2 className="text-heading-dark text-base font-medium leading-relaxed ">
              Great dApps for 2024
            </h2>
            <h3 className="text-subheading-dark text-sm">
              App description goes here
            </h3>
          </div>
        </div>
      </div>
    ),
  },
};
