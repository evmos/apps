import DropdownChainDeposit from "../../../dropdown/DropdownChainDeposit";
import { DropdownChainsDepositProps } from "../../../dropdown/types";
import { ContainerInput } from "container-input";
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
