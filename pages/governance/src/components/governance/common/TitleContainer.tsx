// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";

const TitleContainer = ({
  title,
  ...rest
}: { title: string } & ComponentProps<"div">) => {
  return (
    <div
      className="text-lg font-bold text-pearl"
      data-testid="proposal-title"
      {...rest}
    >
      {title}
    </div>
  );
};

export default TitleContainer;
