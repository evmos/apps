// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps, useEffect } from "react";

import {
  EvmosCopilotIcon,
  EvmosRedIcon,
  KeplrIcon,
  MetamaskIcon,
  WalletConnectIcon,
} from "icons";
import {
  CLICK_CONNECTED_WITH,
  SUCCESSFUL_WALLET_CONNECTION,
  UNSUCCESSFUL_WALLET_CONNECTION,
  useTracker,
} from "tracker";

import { E, cn } from "helpers";

import { Badge, Divider } from "@evmosapps/ui-helpers";
import { useAccount, useConnect } from "wagmi";
import { connectWith } from "@evmosapps/evmos-wallet";
import {
  WALLET_NOTIFICATIONS,
  notifyError,
} from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/errors";
import { useSetupCopilotModal } from "../SetupAccountModal/SetupAccountModal";

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
export const ButtonWallet = ({
  className,
  disabled,
  ...props
}: ComponentProps<"button">) => {
  return (
    <button
      className={cn(
        className,
        "flex w-full px-4 py-3",
        "hover:bg-grayOpacity hover:shadow-md",
        "border-darkPearl shadow rounded border",
        "capitalize items-center space-x-3 text-sm font-bold",
        "transition-all duration-300",
        {
          disabled: disabled,
        }
      )}
      {...props}
    />
  );
};
export const ConnectModalContent = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const { sendEvent } = useTracker();
  const { connectors } = useConnect();
  const connectorIds = connectors.map((c) => c.id);
  const copilot = useSetupCopilotModal();

  const { isConnected } = useAccount();
  useEffect(() => {
    if (isConnected) {
      setIsOpen(false);
    }
  }, [isConnected, setIsOpen]);
  return (
    <div className="space-y-3">
      <>
        <div className="md:mt-5">
          <ButtonWallet
            className="text-left flex "
            onClick={() => {
              copilot.setIsOpen(true);
            }}
          >
            <EvmosCopilotIcon />
            <div className="flex flex-col text-sm grow">
              <p className="">Evmos Copilot</p>
              <p className="font-normal">Recommended for first time users</p>
            </div>

            <Badge variant="success">New</Badge>
          </ButtonWallet>
        </div>
        <Divider>or</Divider>
      </>
      <div className="flex flex-col space-y-3">
        {providers
          .filter((p) => connectorIds.indexOf(p.id) !== -1)
          .map(({ icon, label, id }) => (
            <ButtonWallet
              key={id}
              data-testid={`connect-with-${id}`}
              onClick={async () => {
                /**
                 * TODO: discuss:
                 * I'm lowercasing the id here because the old ids were all lowercase
                 * wagmi has them slightly different
                 * I'm not sure if we need to do that though
                 */
                const provider = id.toLocaleLowerCase();
                setIsOpen(false);

                sendEvent(CLICK_CONNECTED_WITH, {
                  provider,
                });
                const [e] = await E.try(() => connectWith(id));

                if (!e) {
                  sendEvent(SUCCESSFUL_WALLET_CONNECTION, {
                    provider,
                  });
                  return;
                }
                sendEvent(UNSUCCESSFUL_WALLET_CONNECTION, {
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
                // Didn't find a match, so we'll just isOpen the error
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
