// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import type { Meta, StoryObj } from "@storybook/react";

import { Card, Ranking } from "./Card";
import { Icon } from "../images/Icon";
import { Badge } from "../badges/Badge";
import { cn } from "helpers/src/classnames";
import Image from "next/image";
import defaultBg from "../images/default-card.png";

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
      <div className="gap-1.5 flex-col flex w-96 cursor-pointer pl-4 pr-5 pt-5 pb-4">
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

export const RecentSkeleton: Story = {
  args: {
    children: (
      <div className="gap-1.5 flex-col flex w-96 cursor-pointer animate-pulse pl-4 pr-5 pt-5 pb-4">
        <div
          className={cn(
            "relative shrink-0 w-12 h-12 aspect-square rounded-lg shadow overflow-hidden bg-surface-container-highest dark:bg-surface-container-highest-dark",
          )}
        ></div>
        <div className="h-5 px-0.5 bg-surface-container-highest dark:bg-surface-container-highest-dark rounded-full w-20"></div>
        <div className="gap-1 inline-flex">
          <span className="h-4 px-1.5 py-0.5 bg-surface-container-highest dark:bg-surface-container-highest-dark rounded-full w-8 flex " />
          <span className="h-4 px-1.5 py-0.5 bg-surface-container-highest dark:bg-surface-container-highest-dark rounded-full w-8 flex " />
          <span className="h-4 px-1.5 py-0.5 bg-surface-container-highest dark:bg-surface-container-highest-dark rounded-full w-8 flex " />
          <span className="h-4 px-1.5 py-0.5 bg-surface-container-highest dark:bg-surface-container-highest-dark rounded-full w-8 flex " />
        </div>
      </div>
    ),
  },
};

export const Developer: Story = {
  args: {
    children: (
      <div className="gap-4 w-96 flex group pl-4 pr-5 pt-3 pb-3">
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
          className="group-hover:flex hidden bg-surface-container-highest dark:bg-surface-container-highest-dark
        rounded-full items-center px-5 py-3 text-surface-variant dark:text-surface-variant-dark text-base font-medium leading-tight"
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
      <div className="gap-4 w-96 flex group animate-pulse pl-4 pr-5 pt-3 pb-3">
        <div
          className={cn(
            "relative shrink-0 w-12 h-12 aspect-square rounded-lg shadow overflow-hidden bg-surface-container-highest dark:bg-surface-container-highest-dark",
          )}
        ></div>
        <div className="grow shrink basis-0 space-y-2">
          <div className="h-5 px-0.5 bg-surface-container-highest dark:bg-surface-container-highest-dark rounded-full w-20"></div>
          <div className="gap-1 inline-flex">
            <span className="h-4 px-1.5 py-0.5 bg-surface-container-highest dark:bg-surface-container-highest-dark rounded-full w-8 flex " />
            <span className="h-4 px-1.5 py-0.5 bg-surface-container-highest dark:bg-surface-container-highest-dark rounded-full w-8 flex " />
            <span className="h-4 px-1.5 py-0.5 bg-surface-container-highest dark:bg-surface-container-highest-dark rounded-full w-8 flex " />
            <span className="h-4 px-1.5 py-0.5 bg-surface-container-highest dark:bg-surface-container-highest-dark rounded-full w-8 flex " />
          </div>
        </div>
      </div>
    ),
  },
};

export const Trending: Story = {
  args: {
    children: (
      <div className="w-60">
        <div
          className={cn(
            "relative h-[129px]",
            "after:bg-gradient-to-t after:from-black/70 after:to-transparent after:absolute after:w-full after:h-full after:bottom-0",
          )}
        >
          <Ranking className="text-yellow">1</Ranking>
          <Image
            src={defaultBg}
            alt="dApp Name"
            fill={true}
            className="object-cover rounded-xl"
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
    fullWidth: true,
    background: "bg-galaxy-red",
    children: (
      <div className="px-8 pt-8 pb-6 flex-col flex h-96 z-[99999] relative">
        <h6 className="text-subheading dark:text-subheading-dark grow tracking-widest">
          STORY
        </h6>
        <div>
          <h2 className="text-heading dark:text-heading-dark text-xl font-medium leading-relaxed tracking-wide ">
            Great dApps for 2024
          </h2>
          <h3 className="text-subheading dark:text-subheading-dark text-sm tracking-wide">
            App description goes here
          </h3>
        </div>
      </div>
    ),
  },
};

export const Story: Story = {
  args: {
    background: "bg-galaxy-red",
    children: (
      <div className="px-8 pt-8 pb-6 flex-col flex h-[244px] w-[560px] z-[10] relative">
        <h6 className="text-subheading-dark text-xs grow tracking-widest">
          STORY
        </h6>
        <div>
          <h2 className="text-heading-dark text-base font-medium leading-relaxed tracking-wide">
            Great dApps for 2024
          </h2>
          <h3 className="text-subheading-dark text-sm tracking-wide">
            App description goes here
          </h3>
        </div>
      </div>
    ),
  },
};
