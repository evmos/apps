// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

// ⚠️ DO NOT EDIT MANUALLY ⚠️
// this file is auto-generated by scripts/gen-icons.ts

import React, { forwardRef, ForwardedRef } from "react";

function _IconPin(
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
        d="M3 10.5C3 5.5 7 2 12 2C17 2 21 5.5 21 10.5C21 18.3518 14 21.9998 12 21.9998C10 21.9998 3 18.3518 3 10.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

_IconPin.isIcon = true;

export const IconPin = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  _IconPin,
);