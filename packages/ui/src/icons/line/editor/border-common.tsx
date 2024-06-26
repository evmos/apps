// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

// ⚠️ DO NOT EDIT MANUALLY ⚠️
// this file is auto-generated by scripts/gen-icons.ts

import React, { forwardRef, ForwardedRef } from "react";

function _IconBorderCommon(
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
        d="M12 22H15.6C17.8402 22 18.9603 22 19.816 21.564C20.5686 21.1805 21.1805 20.5686 21.564 19.816C22 18.9603 22 17.8402 22 15.6V12M12 22H8.4C6.15979 22 5.03968 22 4.18404 21.564C3.43139 21.1805 2.81947 20.5686 2.43597 19.816C2 18.9603 2 17.8402 2 15.6V12M12 22V2M2 12V8.4C2 6.15979 2 5.03968 2.43597 4.18404C2.81947 3.43139 3.43139 2.81947 4.18404 2.43597C5.03968 2 6.15979 2 8.4 2H12M2 12H22M22 12V8.4C22 6.15979 22 5.03968 21.564 4.18404C21.1805 3.43139 20.5686 2.81947 19.816 2.43597C18.9603 2 17.8402 2 15.6 2H12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

_IconBorderCommon.isIcon = true;

export const IconBorderCommon = forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>(_IconBorderCommon);
