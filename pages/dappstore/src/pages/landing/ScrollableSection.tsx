// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { cn, useEffectEvent } from "helpers";
import { get } from "lodash-es";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { IconButton } from "@evmosapps/ui/button/icon-button.tsx";
import { IconArrowRight } from "@evmosapps/ui/icons/line/arrows/arrow-right.tsx";
import { IconArrowLeft } from "@evmosapps/ui/icons/line/arrows/arrow-left.tsx";
import { Surface } from "@evmosapps/ui/components/surface/index.tsx";
export const ScrollableSection = ({
  children,
  title,
}: PropsWithChildren<{ title: string }>) => {
  const [navigationEnabled, setNavigationEnabled] = useState({
    next: false,
    prev: false,
    visible: false,
  });

  const ref = useRef<HTMLDivElement>(null);
  const updateNavigationEnabledState = useEffectEvent(() => {
    if (!ref.current) return;
    const scrollPosition = ref.current.scrollLeft;
    const containerWidth = ref.current.clientWidth;
    const scrollWidth = ref.current.scrollWidth;

    const next = scrollPosition + containerWidth < scrollWidth;
    const prev = scrollPosition > 0;

    const visible = scrollWidth > containerWidth;
    if (
      next !== navigationEnabled.next ||
      prev !== navigationEnabled.prev ||
      visible !== navigationEnabled.visible
    ) {
      setNavigationEnabled({ next, prev, visible });
    }
  });

  useEffect(() => {
    updateNavigationEnabledState();
  }, [updateNavigationEnabledState]);
  const navigate = (direction: number) => {
    if (!ref.current) return;
    const firstChild = ref.current.firstElementChild;
    if (!firstChild) return;
    const computedStyles = ref.current.computedStyleMap();
    const elementWidth = firstChild.clientWidth;
    const gap = get(computedStyles.get("column-gap"), "value", 0);

    const scrollPosition = ref.current.scrollLeft;
    const containerWidth = ref.current.clientWidth;

    let nextPos = scrollPosition + containerWidth * direction;
    // snap to the first partially visible element
    nextPos =
      direction > 0
        ? Math.floor(nextPos / (elementWidth + gap)) * (elementWidth + gap)
        : Math.ceil(nextPos / (elementWidth + gap)) * (elementWidth + gap + 1);
    ref.current.scrollTo({
      left: nextPos,
      behavior: "smooth",
    });
  };
  return (
    <Surface className="pt-4 gap-y-4 flex flex-col w-full overflow-hidden">
      <header className="px-4 flex items-center">
        <h2 className="text-heading dark:text-heading-dark">{title}</h2>
        <div
          className={cn("flex ml-auto gap-x-3", {
            hidden: !navigationEnabled.visible,
          })}
        >
          <IconButton
            variant="low-emphasis"
            size="sm"
            onClick={() => navigate(-1)}
            disabled={!navigationEnabled.prev}
          >
            <IconArrowLeft />
          </IconButton>
          <IconButton
            variant="low-emphasis"
            size="sm"
            onClick={() => navigate(1)}
            disabled={!navigationEnabled.next}
          >
            <IconArrowRight />
          </IconButton>
        </div>
      </header>
      <div
        className={cn(
          "relative after:absolute after:top-0 after:right-0 after:w-32 after:h-full",
          "after:bg-gradient-to-l",
          "after:from-surface dark:after:from-surface-dark",
          "after:from-10% after:to-transparent",
          "after:opacity-100 after:transition-opacity after:duration-300",
          {
            "after:opacity-0": !navigationEnabled.next,
          },
        )}
      >
        <div
          ref={ref}
          className={
            "overflow-x-auto scrollbar-hidden flex gap-4 px-4 pb-4 w-full"
          }
          onScroll={() => updateNavigationEnabledState()}
        >
          {children}
        </div>
      </div>
    </Surface>
  );
};
