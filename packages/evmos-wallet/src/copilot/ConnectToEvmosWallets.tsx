// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Dispatch } from "react";

import {
  EvmosRedIcon,
  KeplrIcon,
  MetamaskIcon,
  WalletConnectIcon,
} from "icons";
import ButtonWallet from "../wallet/ButtonWallet";
import {
  CLICK_CONNECTED_WITH,
  SUCCESSFUL_WALLET_CONNECTION,
  UNSUCCESSFUL_WALLET_CONNECTION,
  useTracker,
} from "tracker";
import { connectWith } from "../wallet";
import { E } from "helpers";
import {
  WALLET_NOTIFICATIONS,
  notifyError,
} from "../internal/wallet/functionality/errors";

const providers = [
  {
    label: "Keplr",
    id: "keplr",
    icon: <KeplrIcon className="h-8 w-auto" />,
  },
  {
    label: "MetaMask",
    id: "metaMask",
    icon: <MetamaskIcon className="h-8 w-auto" />,
  },
  {
    label: "WalletConnect",
    id: "walletConnect",
    icon: <WalletConnectIcon className="h-8 w-auto" />,
  },
  {
    label: "Evmos Safe",
    id: "safe",
    icon: <EvmosRedIcon />,
  },
] as const;

export const ConnectToEvmosWallets = ({
  setShow,
  copilotModal,
  connectorIds,
}: {
  setShow: Dispatch<React.SetStateAction<boolean>>;
  copilotModal?: React.ReactNode;
  connectorIds: string[];
}) => {
  const { handlePreClickAction: trackConnectedWithWallet } =
    useTracker(CLICK_CONNECTED_WITH);
  const { handlePreClickAction: trackSuccessfulWalletConnection } = useTracker(
    SUCCESSFUL_WALLET_CONNECTION
  );
  const { handlePreClickAction: trackUnsuccessfulWalletConnection } =
    useTracker(UNSUCCESSFUL_WALLET_CONNECTION);

  return (
    <div className="space-y-3 bg-white px-4 pb-4 pt-5 sm:p-6 md:col-span-2 md:px-8">
      {copilotModal !== undefined && copilotModal}
      <div className="flex flex-col space-y-3">
        {providers
          .filter((p) => connectorIds.indexOf(p.id) !== -1)
          .map(({ icon, label, id }) => (
            <ButtonWallet
              key={id}
              onClick={async () => {
                /**
                 * TODO: discuss:
                 * I'm lowercasing the id here because the old ids were all lowercase
                 * wagmi has them slightly different
                 * I'm not sure if we need to do that though
                 */
                const provider = id.toLocaleLowerCase();
                setShow(false);

                trackConnectedWithWallet({
                  provider,
                });
                const [e] = await E.try(() => connectWith(id));

                if (!e) {
                  trackSuccessfulWalletConnection({
                    provider,
                  });
                  return;
                }
                trackUnsuccessfulWalletConnection({
                  message: `Failed to connect with ${label}`,
                  provider,
                });

                if (E.match.byPattern(e, /Connector not found/)) {
                  notifyError(
                    "{walletName} not found",
                    WALLET_NOTIFICATIONS.ExtensionNotFoundSubtext,
                    {
                      walletName: label,
                    }
                  );
                  return;
                }
                if (
                  E.match.byCode(e, -32002) || // metamask
                  E.match.byMessage(e, "PROVIDER_NOT_AVAILABLE") // keplr
                ) {
                  notifyError(
                    "{walletName} not found",
                    WALLET_NOTIFICATIONS.AddressSubtext,
                    {
                      walletName: label,
                    }
                  );
                  return;
                }
                if (
                  E.match.byCode(e, 4001) ||
                  E.match.byPattern(e, /Connection request reset/) || // wallet connect
                  E.match.byPattern(e, /Request rejected/) // keplr
                ) {
                  notifyError(
                    WALLET_NOTIFICATIONS.ErrorTitle,
                    "The connection was rejected",
                    {
                      walletName: label,
                    }
                  );
                  return;
                }
                // Didn't find a match, so we'll just show the error
                notifyError(WALLET_NOTIFICATIONS.ErrorTitle, "", {
                  walletName: label,
                });
              }}
            >
              {icon} <span>{label}</span>
            </ButtonWallet>
          ))}
      </div>
    </div>
  );
};
