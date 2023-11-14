"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useState } from "react";
import { Intro } from "./Intro";
import Onboard from "./Onboard";

import {
  CLICK_ON_DIFFERENT_ON_RAMP,
  useTracker,
  CLICK_ON_DIFFERENT_CRYPTO_OPTION,
} from "tracker";
import ProviderDropwdown from "./ProviderDropdown";
import { providerOptions, DropdownOption } from "./utils";
import { Squid } from "./Squid";
import { raise } from "helpers";
import Transak from "@evmosapps/instant-dapps/src/dapps/Transak";
import { CypherD } from "@evmosapps/instant-dapps";
import C14 from "@evmosapps/instant-dapps/src/dapps/C14";
import LayerSwap from "@evmosapps/instant-dapps/src/dapps/Layerswap";

export const TopUp = () => {
  const [topUpType, setTopUpType] = useState("intro");
  const [cardProvider, setCardProvider] = useState<DropdownOption>(
    providerOptions.card[0] ?? raise("No card provider")
  );
  const [cryptoProvider, setCryptoProvider] = useState<DropdownOption>(
    providerOptions.crypto[0] ?? raise("No crypto provider")
  );

  const { sendEvent } = useTracker();

  const onItemClick = (option: DropdownOption) => {
    sendEvent(CLICK_ON_DIFFERENT_ON_RAMP, { onRampType: option.value });
    setCardProvider(option);
  };

  const onCryptoItemClick = (option: DropdownOption) => {
    sendEvent(CLICK_ON_DIFFERENT_CRYPTO_OPTION, { "Swap Type": option.value });
    setCryptoProvider(option);
  };

  function renderScreen() {
    if (topUpType === "intro") {
      return <Intro setTopUpType={setTopUpType} />;
    } else if (topUpType === "card") {
      return (
        <Onboard setTopUpType={setTopUpType} topUpType={topUpType}>
          <>
            <ProviderDropwdown
              selectedValue={cardProvider}
              onItemClick={onItemClick}
              dropdownOptions={providerOptions.card}
            />
            {cardProvider.value === "Transak" ? <Transak /> : <C14 />}
          </>
        </Onboard>
      );
    } else if (topUpType === "crypto") {
      return (
        <Onboard setTopUpType={setTopUpType} topUpType={topUpType}>
          <>
            <ProviderDropwdown
              selectedValue={cryptoProvider}
              onItemClick={onCryptoItemClick}
              dropdownOptions={providerOptions.crypto}
            />
            {cryptoProvider.value === "Cypher Wallet" ? (
              <CypherD />
            ) : cryptoProvider.value === "Layerswap" ? (
              <LayerSwap />
            ) : (
              <Squid />
            )}
          </>
        </Onboard>
      );
    }
  }

  return <section className="space-y-3">{renderScreen()}</section>;
};
