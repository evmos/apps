// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";
import Link from "next/link";

export const Feedback = ({
  children,
  ...rest
}: ComponentProps<typeof Link>) => {
  return (
    <Link
      target="_blank"
      rel="noreferrer"
      className="bg-red-300 text-pearl text-sm hover:bg-red1 active:bg-red2 fixed -right-[81px] top-1/2 hidden -rotate-90 rounded-tl-lg rounded-tr-lg  font-semibold transition-color duration-200 ease-in-out lg:block "
      {...rest}
    >
      <div className="flex items-center px-5 py-3 ">
        <span className="w-[10rem] text-center ">{children}</span>
      </div>
    </Link>
  );
};
