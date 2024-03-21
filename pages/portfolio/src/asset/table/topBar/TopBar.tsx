// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { PrimaryButton, TopBarItem } from "@evmosapps/ui-helpers";
import { TopBarProps } from "./types";
import { useAccount } from "wagmi";
import { ReceiveIcon } from "@evmosapps/icons/ReceiveIcon";
import { SendIcon } from "@evmosapps/icons/SendIcon";
import { useTranslation } from "@evmosapps/i18n/client";
import { useTransferModal } from "../../../modals/transfer/TransferModal";
import { MetamaskIcon } from "@evmosapps/icons/MetamaskIcon";
import { useRequestModal } from "../../../modals/request/RequestModal";
import {
  CLICK_ON_RECEIVE_BUTTON,
  CLICK_ON_SEND_BUTTON,
  useTracker,
} from "tracker";
import { getActiveProviderKey } from "@evmosapps/evmos-wallet";
import { useMemo } from "react";

interface Ethereum {
  request(args: {
    method: string;
    params: {
      type: string;
      options: {
        address: string;
        symbol: string;
        decimals: number;
        image: string;
      };
    };
  }): Promise<boolean>;
}

declare const ethereum: Ethereum;

const TopBar = ({ topProps }: { topProps: TopBarProps }) => {
  const { isDisconnected, address } = useAccount();
  const activeProvider = getActiveProviderKey();
  const { t } = useTranslation("portfolio");

  const transferModal = useTransferModal();
  const requestModal = useRequestModal();
  const { sendEvent } = useTracker();

  const tokens = useMemo(() => {
    return [
      {
        address: "0xc00971105e61274c8a5cd5a88fe7e037d935b513",
        symbol: "HelloCoin",
        decimals: 18,
        image: "https://assets.codepen.io/4625073/1.jpeg",
      },
      {
        address: "0xd00981105e61274c8a5cd5a88fe7e037d935b513",
        symbol: "TUT",
        decimals: 18,
        image: "http://placekitten.com/200/300",
      },
    ].map((token) => ({
      address: token.address,
      symbol: token.symbol,
      decimals: token.decimals,
      image: token.image,
    }));
  }, []);

  async function addTokenFunction(
    tokens: {
      address: string;
      symbol: string;
      decimals: number;
      image: string;
    }[],
  ) {
    try {
      const requests = tokens.map((token) => ({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: token.address,
            symbol: token.symbol,
            decimals: token.decimals,
            image: token.image,
          },
        },
      }));

      // Send all requests to Metamask
      const results = await Promise.all(
        requests.map((request) => ethereum.request(request)),
      );

      results.forEach((wasAdded) => {
        if (wasAdded) {
          //console.log(`Token ${tokens[index].symbol} added successfully`);
        } else {
          //console.log(`Failed to add token ${tokens[index].symbol}`);
        }
      });
    } catch (error) {
      //console.log(error);
    }
  }

  return (
    <div className="grid bg-darkGray2 text-pearl rounded-2xl p-4 text-center gap-y-6 md:grid-cols-3">
      <TopBarItem text="Total Assets" value={`$${topProps.totalAssets}`} />
      <TopBarItem
        text="EVMOS Price"
        value={
          topProps.evmosPrice === undefined
            ? "--"
            : `$${topProps.evmosPrice.toString()}`
        }
      />
      <div className="flex items-center justify-center space-x-2 md:justify-end">
        <PrimaryButton
          className="py-2 text-sm font-light"
          disabled={isDisconnected}
          icon={<SendIcon width={20} height={20} />}
          data-testid="open-send-modal-button"
          onClick={() => {
            transferModal.setIsOpen(true);
            sendEvent(CLICK_ON_SEND_BUTTON, {
              "User Wallet Address": address,
              "Wallet Provider": activeProvider,
            });
          }}
        >
          <p>{t("transfer.button")}</p>
        </PrimaryButton>
        <PrimaryButton
          className="py-2 text-sm font-light"
          disabled={isDisconnected}
          icon={<ReceiveIcon width={20} height={20} />}
          data-testid="open-request-modal-button"
          onClick={() => {
            requestModal.setIsOpen(true);
            sendEvent(CLICK_ON_RECEIVE_BUTTON, {
              "User Wallet Address": address,
              "Wallet Provider": activeProvider,
            });
          }}
        >
          <p>{t("request.button")}</p>
        </PrimaryButton>
        <PrimaryButton
          variant="secondary-meta"
          className="py-2 text-sm font-light"
          disabled={isDisconnected}
          icon={<MetamaskIcon width={20} height={20} />}
          data-testid="open-request-modal-button"
          onClick={() => {
            void addTokenFunction(tokens);
          }}
        >
          <p className="hidden 2xl:inline">{t("metamask.token.lg")}</p>
          <p className="hidden lg:inline 2xl:hidden">
            {t("metamask.token.md")}
          </p>
        </PrimaryButton>
      </div>
    </div>
  );
};

export default TopBar;
