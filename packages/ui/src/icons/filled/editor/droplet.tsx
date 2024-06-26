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
        d="M20.75 13.8519C20.75 7.49997 14 1.49997 12 1.49997C10 1.49997 3.25 7.49997 3.25 13.8519C3.25 18.8307 6.97296 22.75 12 22.75C17.0271 22.75 20.75 18.8307 20.75 13.8519Z"
        fill="currentColor"
      />
    </svg>
  );
}

_IconDroplet.isIcon = true;

export const IconDroplet = forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>(_IconDroplet);
