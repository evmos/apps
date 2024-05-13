// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { Combobox, ComboboxInput } from "@headlessui/react";
import { ComponentProps, Suspense, useEffect, useRef, useState } from "react";
import { fetchSearchableItems } from "./fetchSearchableItems";
import { cn } from "helpers";
import { InputGroup } from "@evmosapps/ui/forms/input.tsx";
import { IconSearch } from "@evmosapps/ui/icons/line/basic/search.tsx";
import { IconButton } from "@evmosapps/ui/button/icon-button.tsx";
import { IconArrowLeft } from "@evmosapps/ui/icons/filled/arrows/arrow-left.tsx";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { IconCross } from "@evmosapps/ui/icons/line/basic/cross.tsx";

const SearchResults = dynamic(
  () => import("./SearchResults").then((mod) => mod.SearchResults),
  {},
);

export const Search = ({
  className,
  setIsActive,
  isActive,
  ...rest
}: ComponentProps<"div"> & {
  isActive?: boolean;
  setIsActive?: (active: boolean) => void;
}) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isActive) {
      ref.current?.focus();
    }
  }, [isActive]);

  useEffect(() => {
    const cmdK = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsActive?.(true);
      }
    };
    window.addEventListener("keydown", cmdK);
    return () => {
      window.removeEventListener("keydown", cmdK);
    };
  }, [setIsActive]);
  return (
    <div
      className={cn(
        "py-2 flex flex-col items-center top-0 transition-colors duration-200 cursor-pointer",

        {
          "md:fixed md:z-50 md:w-full md:h-full md:bg-scrim-dark/50 ": isActive,
          "md:bg-transparent md:hidden": !isActive,
        },
        className,
      )}
      {...rest}
      onClick={() => {
        setIsActive?.(false);
      }}
    >
      <Combobox
        immediate
        as="div"
        onClick={(e) => {
          e.stopPropagation();
        }}
        // autoFocus={true}
        // data-open={isActive}
        className={cn(
          "w-full md:max-w-xl relative flex flex-col cursor-auto",
          "md:mt-[20vh] md:h-auto",
          "md:bg-surface-container-low md:dark:bg-surface-container-low-dark",
          "md:border-surface-container-high md:dark:border-surface-container-high-dark md:border",
          "md:rounded-lg md:overflow-hidden",
          // {
          //   "md:hidden": !isActive,
          // }
        )}
        onChange={(
          entry: Awaited<
            ReturnType<typeof fetchSearchableItems>
          >["entries"][number],
        ) => {
          if (!entry) return;
          setQuery("");
          setIsActive?.(false);
          router.push(entry.href);
        }}
        onClose={() => {
          setIsActive?.(false);
          setQuery("");
        }}
      >
        <div className="flex gap-2">
          <IconButton
            className={cn(
              "transition-[margin,opacity] duration-200 w-12 md:hidden",
              {
                "ml-0 opacity-100": isActive,
                "-ml-14 opacity-0": !isActive,
              },
            )}
            ghost
            onClick={() => {
              setIsActive?.(false);
            }}
          >
            <IconArrowLeft />
          </IconButton>
          <InputGroup
            className={cn(
              "w-full md:border-none md:h-14 md:rounded-none",
              "md:focus-within:bg-transparent md:dark:focus-within:bg-transparent",
              "md:hover:focus-within:bg-transparent md:dark:hover:focus-within:bg-transparent",
            )}
          >
            <InputGroup.Section>
              <IconSearch />
            </InputGroup.Section>
            <ComboboxInput
              className={cn("w-full")}
              ref={ref}
              id="search"
              as={InputGroup.Input}
              aria-label="Assignee"
              placeholder="Search dApps"
              onFocus={() => {
                setIsActive?.(true);
              }}
              onChange={(event) => {
                if (!isActive) setIsActive?.(true);
                setQuery(event.target.value);
              }}
            />

            <InputGroup.Section
              className={cn("hidden", {
                flex: query.length,
              })}
            >
              <IconButton className={cn("relative z-50")} ghost size="sm">
                <IconCross />
              </IconButton>
            </InputGroup.Section>
          </InputGroup>
        </div>

        <Suspense>
          {isActive && (
            <div className="">
              <SearchResults query={query} />
            </div>
          )}
        </Suspense>
      </Combobox>
    </div>
  );
};
