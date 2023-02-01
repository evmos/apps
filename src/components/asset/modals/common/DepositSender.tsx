import Image from "next/image";
import { TableDataElement } from "../../../../internal/asset/functionality/table/normalizeData";
import { truncateAddress } from "../../../../internal/wallet/style/format";
import { ContainerModal } from "./ContainerModal";
import { TextSmall } from "./TextSmall";

const DepositSender = ({
  token,
  address,
}: {
  address: string;
  token: TableDataElement | undefined;
}) => {
  return (
    <ContainerModal>
      <div className="flex items-center space-x-4">
        <TextSmall text="FROM" />
        {/* TODO: add /assets/ */}
        {token !== undefined && (
          <Image
            src={`/tokens/${token?.symbol.toLowerCase()}.png`}
            alt={token?.symbol}
            width={25}
            height={25}
          />
        )}
        {token !== undefined && (
          <div>
            <p className="font-bold">{token?.symbol}</p>
            <p className="text-xs">{truncateAddress(address)}</p>
          </div>
        )}
      </div>
    </ContainerModal>
  );
};

export default DepositSender;
