// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import DropdownChainDeposit from "../../../dropdown/DropdownChainDeposit";
import { DropdownChainsDepositProps } from "../../../dropdown/types";
import { ContainerInput } from "ui-helpers";
import { TextSmall } from "../TextSmall";

const ChainContainerDeposit = ({
  dropChainProps,
}: {
  dropChainProps: DropdownChainsDepositProps;
}) => {
  return (
    <div className="space-y-3">
      <TextSmall text="CHAIN" />
      <ContainerInput>
        <DropdownChainDeposit dropChainProps={dropChainProps} />
      </ContainerInput>
    </div>
  );
};

export default ChainContainerDeposit;
