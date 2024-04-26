// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";
export const DescriptionItem = ({
  title,
  ...rest
}: { title: string } & ComponentProps<"div">) => {
  const isSpecialTitle = title === "Social" || title === "Website";
  return (
    <div className="mb-3 space-y-5">
      <h2
        className={`text-heading dark:text-heading-dark tracking-wide ${
          isSpecialTitle ? "text-base" : "text-xl md:text-xl"
        }`}
      >
        {title}
      </h2>
      <div
        className="text-sm md:text-base text-paragraph dark:text-paragraph flex flex-row space-x-4"
        {...rest}
      />
    </div>
  );
};
