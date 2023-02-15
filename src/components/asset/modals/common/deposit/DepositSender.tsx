import Image from "next/image";
import { TableDataElement } from "../../../../../internal/asset/functionality/table/normalizeData";
import { getSymbol } from "../../../../../internal/asset/style/format";
import { EVMOS_SYMBOL } from "../../../../../internal/wallet/functionality/networkConfig";
import { truncateAddress } from "../../../../../internal/wallet/style/format";
import { DropdownChainsProps } from "../../../dropdown/types";
import { ContainerModal } from "../ContainerModal";
import { TextSmall } from "../TextSmall";
import ChainContainer from "../withdraw/ChainContainer";

const DepositSender = ({
  token,
  address,
  dropChainProps,
}: {
  address: string;
  token: TableDataElement | undefined;
  dropChainProps: DropdownChainsProps;
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
              />
            )}

          <div>
            {token !== undefined && token.symbol !== EVMOS_SYMBOL && (
              <p className="font-bold">{symbol}</p>
            )}
            <p className="text-xs">{truncateAddress(address)}</p>
          </div>
        </div>
        {token !== undefined && token.symbol === EVMOS_SYMBOL && (
          <ChainContainer dropChainProps={dropChainProps} />
        )}
      </>
    </ContainerModal>
  );
};

export default DepositSender;
