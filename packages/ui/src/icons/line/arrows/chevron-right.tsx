// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

// ⚠️ DO NOT EDIT MANUALLY ⚠️
// this file is auto-generated by scripts/gen-icons.ts

import React, { forwardRef, ForwardedRef } from "react";

function _IconChevronRight(
  { className, ...props }: React.SVGProps<SVGSVGElement>,
  ref: ForwardedRef<SVGSVGElement>,
) {
  return (
    <svg
      height="24"
      width="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      className={["icon", className].join(" ")}
      {...props}
    >
      <path
        d="M10 6L16 12L10 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

_IconChevronRight.isIcon = true;

export const IconChevronRight = forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>(_IconChevronRight);
