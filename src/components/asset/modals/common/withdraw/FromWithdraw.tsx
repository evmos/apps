import Image from "next/image";
import { truncateAddress } from "../../../../../internal/wallet/style/format";
import { ContainerModal } from "../ContainerModal";
import { TextSmall } from "../TextSmall";

const FromWithdraw = ({ address }: { address: string }) => {
  return (
    <ContainerModal>
      <div className="flex items-center space-x-4">
        <TextSmall text="FROM" />
        <Image
          src="/assets/tokens/evmos.png"
          alt="evmos"
          width={25}
          height={25}
        />
        <div>
          <p className="font-bold">Evmos</p>
          <p className="text-xs">{truncateAddress(address)}</p>
        </div>
      </div>
    </ContainerModal>
  );
};

export default FromWithdraw;
