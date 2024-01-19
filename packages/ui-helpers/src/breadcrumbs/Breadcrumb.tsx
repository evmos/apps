// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { RightArrow } from "@evmosapps/icons/RightArrow";
import { CLICK_ON_BREADCRUMB } from "tracker";
import { TrackerEvent } from "../TrackerEvent";

export const Breadcrumb = ({
  pages,
}: {
  pages: { name: string; href: string }[];
}) => {
  return (
    <nav
      className="flex -mb-5 justify-center md:justify-start text-sm"
      aria-label="breadcrumb"
    >
      <ol role="list" className="flex items-center space-x-1 tracking-wide">
        {pages.map((page, index) => (
          <li key={page.name}>
            <div className="flex items-center">
              {index > 0 && (
                <RightArrow
                  className="h-3 w-3 flex-shrink-0 text-white/70"
                  aria-hidden="true"
                />
              )}
              <TrackerEvent
                event={CLICK_ON_BREADCRUMB}
                properties={{ Breadcrumb: page.name }}
              >
                <a
                  href={page.href}
                  className={`pl-1 transition-all duration-200 ${
                    index === pages.length - 1
                      ? "text-pearl hover:text-white/90 font-bold"
                      : "text-white/70 hover:text-pearl font-light"
                  }`}
                  aria-current={index === pages.length - 1 ? "page" : undefined}
                >
                  {page.name}
                </a>
              </TrackerEvent>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
