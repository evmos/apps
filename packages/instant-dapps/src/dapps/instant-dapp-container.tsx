// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { useAccount } from "wagmi";
import { ConnectionRequired } from "@evmosapps/ui-helpers";
import { ConnectButton } from "stateful-components/src/connect-button";

type ContainerProps = {
  image: string;
  dappName: string;
  widget: JSX.Element;
};

export const InstantDappContainer = ({
  image,
  dappName,
  widget,
}: ContainerProps) => {
  const { isDisconnected } = useAccount();
  if (isDisconnected) {
    return (
      <ConnectionRequired bgUrl={image} dappName={dappName}>
        <ConnectButton />
      </ConnectionRequired>
    );
  }
  return widget;
};
