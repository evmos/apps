import { KeplrIcon, MetamaskIcon, WalletConnectIcon } from "icons";
import {
  KEPLR_KEY,
  METAMASK_KEY,
  WALLECT_CONNECT_KEY,
  WalletExtension,
} from "../../internal/wallet/functionality/wallet";
import { formatProviderAddress } from "../../internal/wallet/style/format";
import { Dispatch, SetStateAction } from "react";

export const ButtonProfile = ({
  walletExtension,
  setShow,
}: {
  walletExtension: WalletExtension;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <button
      className="flex items-center space-x-3 justify-center"
      onClick={() => {
        setShow(true);
      }}
    >
      {walletExtension.extensionName === METAMASK_KEY && <MetamaskIcon />}
      {walletExtension.extensionName === KEPLR_KEY && <KeplrIcon />}
      {walletExtension.extensionName === WALLECT_CONNECT_KEY && (
        <WalletConnectIcon />
      )}

      <span className="text-lg font-bold">
        {formatProviderAddress(walletExtension, true)}
      </span>
    </button>
  );
};
