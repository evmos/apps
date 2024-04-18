// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

// ⚠️ DO NOT EDIT MANUALLY ⚠️
// this file is auto-generated by scripts/gen-icons.ts

import React, { forwardRef, ForwardedRef } from "react";

function _IconDroplet(
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
        d="M20 13.8519C20 24.7161 4 24.7161 4 13.8518C4 8.924 8.0643 4.99972 10.399 3.15197C10.8516 2.79377 11.0779 2.61467 11.4706 2.50692C11.7562 2.42855 12.2434 2.42855 12.529 2.50691C12.9216 2.61464 13.148 2.79373 13.6006 3.15192C15.9354 4.99966 20 8.92397 20 13.8519Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

_IconDroplet.isIcon = true;

export const IconDroplet = forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>(_IconDroplet);