"use client";
import { cn, modalLink, useModal } from "helpers";
import { AddressDisplay, Modal, Tooltip } from "@evmosapps/ui-helpers";
import { ProvidersIcons } from "../../providerIcons";
import { useAccount, useDisconnect } from "wagmi";
import { normalizeToEvmos } from "@evmosapps/evmos-wallet";
import { EXPLORER_URL } from "constants-helper";
import { CopyIcon, ExternalLinkIcon } from "icons";
import { useEffect, useState } from "react";
import { CLICK_DISCONNECT_WALLET_BUTTON, useTracker } from "tracker";

export const useProfileModal = () => useModal("profile");
export const ProfileModalButton = modalLink("profile");

const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timeout = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isCopied]);

  return (
    <button
      className="text-xs font-normal"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
      }}
    >
      <Tooltip
        element={<CopyIcon width={14} height={14} />}
        text={isCopied ? "Copied!" : "Copy"}
      />
    </button>
  );
};
export const ProfileModal = () => {
  const { isOpen, setIsOpen } = useProfileModal();
  const { connector, address } = useAccount();
  const { sendEvent } = useTracker();
  const { disconnect } = useDisconnect({
    onSuccess: () => {
      setIsOpen(false);
    },
  });
  if (!connector || !address) {
    return null;
  }
  const evmosAddress = normalizeToEvmos(address);

  const Icon = ProvidersIcons[connector.id];
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Modal.Body>
        <div className="space-y-4">
          <Modal.Header>
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Wallet
            </h3>
          </Modal.Header>
          <div className="flex items-center gap-x-4 ">
            <div>{Icon && <Icon height={40} width={40} />}</div>
            <div className="flex flex-col font-mono text-sm font-bold gap-y-2">
              <p className="gap-x-2 flex">
                <AddressDisplay address={evmosAddress} maxLength={24} />

                <CopyButton text={evmosAddress} />
              </p>
              <p className="gap-x-2 flex">
                <AddressDisplay address={address} maxLength={24} />
                <CopyButton text={address} />
              </p>
            </div>
            <div className="ml-auto">
              <a
                target="_blank"
                rel="noreferrer"
                href={`${EXPLORER_URL}/address/${evmosAddress}`}
                className="flex w-fit items-center space-x-2 text-xs border rounded p-3 border-darkPearl  hover:bg-grayOpacity"
              >
                <ExternalLinkIcon width={20} height={20} />
              </a>
            </div>
          </div>

          <button
            className={cn(
              "border-darkPearl hover:bg-grayOpacity mt-3 w-full rounded border p-3 font-bold uppercase"
            )}
            onClick={() => {
              disconnect();
              sendEvent(CLICK_DISCONNECT_WALLET_BUTTON, {
                wallet: address,
                provider: connector?.id,
              });
            }}
          >
            Disconnect
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
