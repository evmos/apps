// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { PrimaryButton, TopBarItem } from "@evmosapps/ui-helpers";
import { TopBarProps } from "./types";
import { useAccount } from "wagmi";
import { ReceiveIcon } from "@evmosapps/icons/ReceiveIcon";
import { SendIcon } from "@evmosapps/icons/SendIcon";
import { useTranslation } from "@evmosapps/i18n/client";
import { useTransferModal } from "../../../modals/transfer/TransferModal";
import { useRequestModal } from "../../../modals/request/RequestModal";
import {
  CLICK_ON_RECEIVE_BUTTON,
  CLICK_ON_SEND_BUTTON,
  useTracker,
} from "tracker";
import { getActiveProviderKey } from "@evmosapps/evmos-wallet";
import { useMemo } from "react";
import { useDataTokens } from "../../../utils/hooks/useDataTokens";
import { TableDataElement } from "../../../utils/table/normalizeData";
import { ProvidersIcons } from "stateful-components/src/providerIcons";

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

const TopBar = ({
  topProps,
  tableData,
}: {
  topProps: TopBarProps;
  tableData: TableDataElement[];
}) => {
  const { isDisconnected, address, connector } = useAccount();
  const activeProvider = getActiveProviderKey();
  const { t } = useTranslation("portfolio");

  const transferModal = useTransferModal();
  const requestModal = useRequestModal();
  const { sendEvent } = useTracker();

  const { dataTokens: data } = useDataTokens({
    tableData,
  });

  const tokens = useMemo(() => {
    const tokensList: {
      address: string;
      symbol: string;
      decimals: number;
      image: string;
    }[] = [];

    data.forEach((tokenData) => {
      tokenData.tokens.forEach((token) => {
        tokensList.push({
          address: token.erc20Address,
          symbol: token.symbol,
          decimals: token.decimals,
          image: token.pngSrc,
        });
      });
    });

    return tokensList;
  }, [data]);

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
        } else {
        }
      });
    } catch (error) {}
  }

  const Icon = connector && ProvidersIcons[connector.name];

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
      <div className="flex flex-col md:flex-row items-center justify-center space-x-2 md:justify-end">
        <div className="flex space-x-2 md:order-1">
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
        </div>
        <div className="md:order-last my-2">
          <PrimaryButton
            variant="secondary-meta"
            className={`py-2 text-sm font-light ${
              //TODO: change activeProvider !== "MetaMask" to (activeProvider !== "MetaMask" && activeProvider !== "Rabbit")
              isDisconnected || activeProvider !== "MetaMask" ? "hidden" : ""
            }`}
            disabled={isDisconnected}
            icon={Icon && <Icon width="1.4em" height="1.4em" />}
            data-testid="open-request-modal-button"
            onClick={() => {
              void addTokenFunction(tokens);
            }}
          >
            <p className="hidden 2xl:inline">
              {t("add.token.lg") + activeProvider}
            </p>
            <p className="hidden xl:inline 2xl:hidden">{t("add.token.md")}</p>
            <p className="hidden lg:inline xl:hidden">{t("add.token.xs")}</p>
            <p className=" md:hidden">{t("add.token.lg") + activeProvider}</p>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
