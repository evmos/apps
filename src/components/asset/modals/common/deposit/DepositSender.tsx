import Image from "next/image";
import { TableDataElement } from "../../../../../internal/asset/functionality/table/normalizeData";
import { getSymbol } from "../../../../../internal/asset/style/format";
import { EVMOS_SYMBOL } from "../../../../../internal/wallet/functionality/networkConfig";
import { truncateAddress } from "../../../../../internal/wallet/style/format";
import { DropdownChainsDepositProps } from "../../../dropdown/types";
import { ContainerModal } from "../ContainerModal";
import { TextSmall } from "../TextSmall";
import ChainContainerDeposit from "./ChainContainerDeposit";

const DepositSender = ({
  token,
  address,
  dropChainProps,
}: {
  address: string;
  token: TableDataElement | undefined;
  dropChainProps: DropdownChainsDepositProps;
}) => {
  const symbol = getSymbol(token, dropChainProps.chain);

  return (
    <ContainerModal>
      <>
        <div className="flex items-center space-x-4">
          <TextSmall text="FROM" />

          {token !== undefined &&
            token.symbol !== EVMOS_SYMBOL &&
            symbol !== undefined && (
              <Image
                src={`/assets/tokens/${symbol.toLowerCase()}.png`}
                alt={symbol}
                width={25}
                height={25}
                className="w-auto"
              />
            )}

          <div>
            {token !== undefined && token.symbol !== EVMOS_SYMBOL && (
              <p className="font-bold">{symbol}</p>
            )}
            <p className="text-xs">{truncateAddress(address)}</p>
          </div>
        </div>
        <ChainContainerDeposit dropChainProps={dropChainProps} />
      </>
    </ContainerModal>
  );
};

export default DepositSender;
