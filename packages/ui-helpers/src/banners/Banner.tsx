// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";

export const Banner = ({ ...rest }: ComponentProps<"section">) => {
  return (
    <section
      className="bg-red-300 px-4 py-2 text-red-white font-bold text-center"
      {...rest}
    ></section>
  );
};
