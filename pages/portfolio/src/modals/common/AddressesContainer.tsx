// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { normalizeToEvmos } from "@evmosapps/evmos-wallet";
import { CopyContainer } from "../transfer/CopyContainer";
import { useAccount } from "wagmi";

export const AddressesContainer = () => {
  const copyToClipboard = async (wallet: string) => {
    await navigator.clipboard.writeText(wallet);
  };

  const { address } = useAccount();

  const handleCosmosFormat = async () => {
    await copyToClipboard(normalizeToEvmos(address as string));
  };

  const handleEthFormat = async () => {
    await copyToClipboard(address as string);
  };

  return (
    <div className="flex flex-col space-y-1">
      <CopyContainer
        address={address && normalizeToEvmos(address)}
        handleOnClick={handleCosmosFormat}
      />

      <CopyContainer address={address} handleOnClick={handleEthFormat} />
    </div>
  );
};
