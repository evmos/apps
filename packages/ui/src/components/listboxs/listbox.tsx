// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Listbox as ListboxLocal, Transition } from "@headlessui/react";
import {
  ComponentPropsWithoutRef,
  Fragment,
  PropsWithChildren,
  forwardRef,
} from "react";
import { cn } from "helpers/src/classnames";
export function Listbox({
  children,
  ...rest
}: PropsWithChildren<typeof ListboxLocal>) {
  return (
    <ListboxLocal {...rest}>
      <div className="relative">{children ?? <div />}</div>
    </ListboxLocal>
  );
}

Listbox.Menu = ListboxLocal;

const Button = forwardRef<
  HTMLButtonElement,
  {
    className?: string;
  } & ComponentPropsWithoutRef<typeof ListboxLocal.Button>
>(function ListboxButton({ children, className, ...rest }, ref) {
  return (
    <ListboxLocal.Button
      ref={ref}
      className={cn("", className as string)}
      {...rest}
    >
      {children}
    </ListboxLocal.Button>
  );
});

Listbox.Button = Button;

const ListboxOptions = forwardRef<
  HTMLDivElement,
  {
    className?: string;
  } & ComponentPropsWithoutRef<typeof ListboxLocal.Options>
>(function ListboxOptions({ children, className, ...rest }, ref) {
  return (
    <Transition
      as={Fragment}
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <ListboxLocal.Options
        ref={ref}
        className={cn(
          "space-y-2 z-30 text-sm absolute w-fit mt-4 max-h-60 overflow-auto origin-top-right bg-surface-container-low dark:bg-surface-container-low-dark border border-surface-container dark:border-surface-container-dark text-surface-container-high-dark dark:text-surface-container-high rounded-2xl pt-6 p-3",
          className as string,
        )}
        {...rest}
      >
        {children}
      </ListboxLocal.Options>
    </Transition>
  );
});

Listbox.Options = ListboxOptions;

const ListboxOption = forwardRef<
  HTMLDivElement,
  {
    className?: string;
    disabled?: boolean;
    selected?: boolean;
    focus?: boolean;
    activeSort: boolean;
  } & ComponentPropsWithoutRef<typeof ListboxLocal.Option>
>(function ListboxOption(
  { children, className, disabled, activeSort, ...rest },
  ref,
) {
  return (
    <ListboxLocal.Option
      ref={ref}
      className={cn(
        "data-[focus]:bg-primary/10 data-[focus]:dark:bg-primary-dark/10 data-[focus]:rounded-lg",
        "data-[selected]:bg-primary/10 data-[selected]:dark:bg-primary-dark/10 data-[selected]:rounded-lg",
        "cursor-pointer truncate flex items-center justify-between w-full py-3 px-3 gap-4 hover:bg-primary/10 hover:dark:bg-primary-dark/10 hover:rounded-lg focus-visible:rounded-lg focus:bg-on-surface/10 focus:dark:bg-on-surface-dark/10",
        disabled && "disabled",
        activeSort && "bg-primary/10 dark:bg-primary-dark/10 rounded-lg",
        className as string,
      )}
      {...rest}
    >
      {children}
    </ListboxLocal.Option>
  );
});

Listbox.Option = ListboxOption;
