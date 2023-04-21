// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { truncateAddress } from "evmos-wallet";
import { DropdownChainsDepositProps } from "../../../dropdown/types";
import { ContainerModal } from "../ContainerModal";
import { TextSmall } from "../TextSmall";
import ChainContainerDeposit from "./ChainContainerDeposit";

const DepositSender = ({
  address,
  dropChainProps,
}: {
  address: string;
  dropChainProps: DropdownChainsDepositProps;
}) => {
  return (
    <ContainerModal>
      <>
        <div className="flex items-center space-x-4">
          <TextSmall text="FROM" />
          <p className="text-xs">{truncateAddress(address)}</p>
        </div>
        <ChainContainerDeposit dropChainProps={dropChainProps} />
      </>
    </ContainerModal>
  );
};

export default DepositSender;
