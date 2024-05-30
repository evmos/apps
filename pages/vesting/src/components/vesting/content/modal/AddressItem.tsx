// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { EXPLORER_URL } from "@evmosapps/constants";
import { ViewExplorer } from "@evmosapps/ui-helpers";

type AddressItemProps = {
  bech32Address: string;
  hexAddress: string;
  title: string;
};
export const AddresItem = ({
  bech32Address,
  hexAddress,
  title,
}: AddressItemProps) => {
  return (
    <div className="space-y-2">
      <div className="smallText">
        <ViewExplorer
          txHash={bech32Address}
          explorerTxUrl={EXPLORER_URL + "/address"}
          text={title}
        />
      </div>
      <div className="flex">
        <p className="opacity-70 w-24 md:w-16">Bech32</p>
        <b className="break-all">{bech32Address}</b>
      </div>
      <div className="flex">
        <p className="opacity-70 w-24 md:w-16">Hex</p>
        <b className="break-all">{hexAddress}</b>
      </div>
    </div>
  );
};
