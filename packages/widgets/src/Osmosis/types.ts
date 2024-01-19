// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ReactNode } from "react";

export interface TooltipProps {
  content: ReactNode;
  /** Tippy space-separated trigger: https://github.com/tvkhoa/react-tippy#props.
   * Options: mouseenter focus click manual
   * Default: click
   */
  trigger?: string;
}
