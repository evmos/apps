import DropdownChains from "../../../dropdown/DropdownChains";
import { DropdownChainsProps } from "../../../dropdown/types";
import { ContainerInput } from "ui-helpers";
import { TextSmall } from "../TextSmall";

const ChainContainer = ({
  dropChainProps,
}: {
  dropChainProps: DropdownChainsProps;
}) => {
  return (
    <div className="space-y-3">
      <TextSmall text="CHAIN" />
      <ContainerInput>
        <DropdownChains dropChainProps={dropChainProps} />
      </ContainerInput>
    </div>
  );
};

export default ChainContainer;
