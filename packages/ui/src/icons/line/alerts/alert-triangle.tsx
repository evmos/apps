// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

// ⚠️ DO NOT EDIT MANUALLY ⚠️
// this file is auto-generated by scripts/gen-icons.ts

import React, { forwardRef, ForwardedRef } from "react";

function _IconAlertTriangle(
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
        d="M12 13V9M12.5 16.5C12.5 16.7761 12.2761 17 12 17C11.7239 17 11.5 16.7761 11.5 16.5M12.5 16.5C12.5 16.2239 12.2761 16 12 16C11.7239 16 11.5 16.2239 11.5 16.5M12.5 16.5H11.5M19.3311 10.0912L18.98 9.46437C16.6988 5.39063 15.5581 3.35377 14.0576 2.67625C12.7495 2.08558 11.2505 2.08558 9.94239 2.67625C8.44189 3.35377 7.30124 5.39064 5.01995 9.46438L4.66894 10.0912C2.47606 14.007 1.37961 15.965 1.56302 17.5683C1.72303 18.967 2.46536 20.2335 3.60763 21.0566C4.91688 22 7.16092 22 11.649 22H12.351C16.8391 22 19.0831 22 20.3924 21.0566C21.5346 20.2335 22.277 18.967 22.437 17.5683C22.6204 15.965 21.5239 14.007 19.3311 10.0912Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

_IconAlertTriangle.isIcon = true;

export const IconAlertTriangle = forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>(_IconAlertTriangle);