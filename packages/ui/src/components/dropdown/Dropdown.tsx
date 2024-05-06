// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import {
  ComponentProps,
  ComponentPropsWithoutRef,
  PropsWithChildren,
  forwardRef,
} from "react";
import { Menu } from "@headlessui/react";
import { cn } from "helpers/src/classnames";

export function Dropdown({
  children,
  ...rest
}: PropsWithChildren<typeof Menu>) {
  return <Menu {...rest}>{children ?? <div />}</Menu>;
}

Dropdown.Menu = Menu;

const MenuButton = forwardRef<
  HTMLButtonElement,
  {
    className?: string;
  } & ComponentPropsWithoutRef<typeof Menu.Button>
>(function MenuButton({ children, className, ...rest }, ref) {
  return (
    <Menu.Button ref={ref} className={cn("", className as string)} {...rest}>
      {children}
    </Menu.Button>
  );
});

Dropdown.Button = MenuButton;

const MenuItems = forwardRef<
  HTMLDivElement,
  {
    className?: string;
  } & ComponentPropsWithoutRef<typeof Menu.Items>
>(function MenuItems({ children, className, ...rest }, ref) {
  return (
    <Menu.Items
      ref={ref}
      className={cn(
        "space-y-5 z-30 text-center text-sm absolute right-0 mt-7 w-96 origin-top-right bg-surface-container-low dark:bg-surface-container-low-dark border border-surface-container dark:border-surface-container-dark text-surface-container-high-dark dark:text-surface-container-high  rounded-2xl pt-6 p-3",
        className as string,
      )}
      {...rest}
    >
      {children}
    </Menu.Items>
  );
});

Dropdown.Items = MenuItems;

const MenuItem = forwardRef<
  HTMLDivElement,
  {
    className?: string;
    disabled?: boolean;
  } & ComponentPropsWithoutRef<typeof Menu.Item>
>(function MenuItem({ children, className, disabled, ...rest }, ref) {
  return (
    <Menu.Item
      ref={ref}
      className={cn(
        "flex items-center justify-between w-full py-3 px-3 [&:not(:last-child)]:border-b border-b-surface-container-high dark:border-b-surface-container-high-dark gap-4 hover:bg-primary/10 hover:dark:bg-primary-dark/10 hover:rounded-lg focus-visible:rounded-lg focus:bg-on-surface/10 focus:dark:bg-on-surface-dark/10 focus:ring-1 focus:ring-tertiary-container focus:dark:ring-tertiary-container-dark ",
        disabled && "disabled",
        className as string,
      )}
      {...rest}
    >
      {children}
    </Menu.Item>
  );
});

Dropdown.Item = MenuItem;

const Container = ({
  className,
  ...props
}: { className?: string } & ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "rounded-xl bg-surface-container dark:bg-surface-container-dark",
        className as string,
      )}
      {...props}
    />
  );
};

Dropdown.Container = Container;

const MenuTitle = forwardRef<
  HTMLDivElement,
  {
    className?: string;
    align?: "left" | "center" | "right" | "between";
    disabled?: boolean;
  } & ComponentPropsWithoutRef<typeof Menu.Item>
>(function MenuTitle(
  { children, className, disabled, align = "between", ...rest },
  ref,
) {
  return (
    <Menu.Item
      ref={ref}
      className={cn(
        "text-center text-base font-medium leading-5 flex items-center w-full px-3 pt-4 gap-3",
        align === "between" && "justify-between",
        align === "left" && "justify-start",
        align === "right" && "justify-end",
        align === "center" && "justify-center",
        disabled && "disabled",
        className as string,
      )}
      {...rest}
    >
      {children}
    </Menu.Item>
  );
});

Dropdown.Title = MenuTitle;
