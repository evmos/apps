import { WalletExtension } from "../../internal/wallet/functionality/wallet";
import { formatProviderAddress } from "../../internal/wallet/style/format";
import { Dispatch, SetStateAction } from "react";
import { ProvidersIcons } from "../../copilot/utils";

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
      {ProvidersIcons[walletExtension.extensionName]}

      <span className="text-lg font-bold">
        {formatProviderAddress(walletExtension, true)}
      </span>
    </button>
  );
};
