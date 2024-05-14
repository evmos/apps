// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

// ⚠️ DO NOT EDIT MANUALLY ⚠️
// this file is auto-generated by scripts/gen-icons.ts

import React, { forwardRef, ForwardedRef } from "react";

function _IconHeart(
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
        d="M12 21C13 21 22 16.0003 22 9.00046C22 5.5006 19 3.04408 16 3.00068C14.5 2.97897 13 3.50068 12 5.00062C11 3.50068 9.47405 3.00068 8 3.00068C5 3.00068 2 5.5006 2 9.00046C2 16.0003 11 21 12 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

_IconHeart.isIcon = true;

export const IconHeart = forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>(_IconHeart);
