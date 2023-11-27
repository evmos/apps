// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Image from "next/image";
import { truncateAddress } from "@evmosapps/evmos-wallet";
import { ContainerModal } from "../ContainerModal";
import { TextSmall } from "../TextSmall";

const FromWithdraw = ({ address }: { address: string }) => {
  return (
    <ContainerModal>
      <div className="flex items-center space-x-4">
        <TextSmall text="FROM" />
        <Image
          src="/tokens/evmos.png"
          alt="evmos"
          width={25}
          height={25}
          className="w-auto"
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
