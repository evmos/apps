// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import dynamic from "next/dynamic";
import { FunctionComponent } from "react";
import { TooltipProps } from "./types";
import { cn } from "helpers";
import { OsmosisInfoIcon } from "@evmosapps/icons/osmosis/OsmosisInfoIcon";

const Tippy = dynamic(() => import("@tippyjs/react"), { ssr: false });

export const InfoTooltip: FunctionComponent<TooltipProps> = ({
  content,
  trigger,
}) => (
  <Tippy
    className="font-inter rounded-lg border border-osmoverse-600 bg-osmoverse-900 text-white text-sm p-2 md:p-1"
    content={content}
    trigger={trigger ?? "click"}
  >
    <div
      className={cn("flex cursor-pointer align-middle text-wosmongton-300")}
      onClick={(e) => e.stopPropagation()}
    >
      <OsmosisInfoIcon />
    </div>
  </Tippy>
);
