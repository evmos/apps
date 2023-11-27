// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Title } from "@evmosapps/ui-helpers/src/titles/Title";
import { ComponentProps } from "react";
export const DescriptionItem = ({
  title,
  ...rest
}: { title: string } & ComponentProps<"div">) => {
  return (
    <div className="space-y-2">
      <Title variant="small">{title}</Title>
      <div
        className="text-lg text-white/70 flex flex-row space-x-10"
        {...rest}
      />
    </div>
  );
};
