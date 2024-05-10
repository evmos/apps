// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ReactNode } from "react";
import { IconChevronRight } from "@evmosapps/ui/icons/line/arrows/chevron-right.tsx";
import { CLICK_ON_BREADCRUMB } from "tracker";
import { TrackerEvent } from "../TrackerEvent";
import Link from "next/link";
import { cn } from "helpers";

interface BreadcrumbItem {
  name: string | ReactNode;
  href: string;
}

export const Breadcrumb = ({ pages }: { pages: BreadcrumbItem[] }) => {
  return (
    <nav
      className="hidden md:flex -mb-5 justify-center md:justify-start text-base"
      aria-label="breadcrumb"
    >
      <ol role="list" className="flex items-center space-x-3 tracking-wide">
        {pages.map((page, index) => (
          <li key={index}>
            <div className="flex items-center space-x-3">
              {index > 0 && (
                <IconChevronRight
                  className={cn("h-5 w-5 flex-shrink-0 text-paragraph")}
                  aria-hidden="true"
                />
              )}
              <TrackerEvent
                event={CLICK_ON_BREADCRUMB}
                properties={{ Breadcrumb: page.name }}
              >
                <Link
                  href={page.href}
                  className="transition-all duration-200 text-paragraph hover:text-paragraph-dark font-light"
                  aria-current={index === pages.length - 1 ? "page" : undefined}
                >
                  {page.name}
                </Link>
              </TrackerEvent>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
