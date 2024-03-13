// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { LeapIcon } from "@evmosapps/icons/LeapWalletIcon";
import { ButtonWallet } from "./ConnectModalContent";
import { Badge } from "@evmosapps/ui-helpers";
import { useTranslation } from "@evmosapps/i18n/client";

const wallets = [
  {
    name: "Leap Wallet",
    icon: <LeapIcon className="w-7" />,
  },
];

export const ComingSoonWallets = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col space-y-3">
      {wallets.map((wallet) => {
        return (
          <ButtonWallet
            key={wallet.name}
            className="flex w-full"
            disabled={true}
          >
            {wallet.icon}
            <span className="grow flex">{wallet.name}</span>
            <Badge variant="success">{t("messages.comingSoon")}</Badge>
          </ButtonWallet>
        );
      })}
    </div>
  );
};
