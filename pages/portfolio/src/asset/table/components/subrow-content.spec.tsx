// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  CLICK_BUTTON_CONVERT,
  disableMixpanel,
  localMixpanel as mixpanel,
} from "tracker";
import { SubRowContent } from "./SubRowContent";
import { BigNumber } from "@ethersproject/bignumber";
import { RootProviders } from "stateful-components/src/root-providers";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../../vitest.setup";

const MOCKED_TOKEN = {
  name: "Wrapped Ether",
  symbol: "gWETH",
  decimals: 18,
  erc20Balance: BigNumber.from(20000000000000),
  cosmosBalance: BigNumber.from(0),
  tokenName: "gWETH",
  tokenIdentifier: "WETH",
  description: "Wrapped Ether via Gravity Bridge",
  coingeckoPrice: 2213.16,
  chainId: "gravity-bridge-3",
  chainIdentifier: "Gravity",
  handledByExternalUI: null,
  erc20Address: "0xc03345448969Dd8C00e9E4A85d2d9722d093aF8E",
  pngSrc:
    "https://raw.githubusercontent.com/cosmos/chain-registry/master/gravitybridge/images/gweth.png",
  prefix: "gravity",
};
describe("Testing Tab Nav Item ", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };
  test("should call mixpanel event for convert button", async () => {
    render(
      <SubRowContent
        item={MOCKED_TOKEN}
        setIsOpen={vi.fn()}
        setModalContent={vi.fn()}
        feeBalance={BigNumber.from(1)}
        isIBCBalance={true}
      />,
      { wrapper },
    );
    const button = screen.getByText("Convert");
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_BUTTON_CONVERT, {
      Token: MOCKED_TOKEN.tokenName,
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });
  test("should not call mixpanel event for convert button", async () => {
    disableMixpanel();
    render(
      <SubRowContent
        item={MOCKED_TOKEN}
        setIsOpen={vi.fn()}
        setModalContent={vi.fn()}
        feeBalance={BigNumber.from(1)}
        isIBCBalance={true}
      />,
      { wrapper },
    );

    const button = screen.getByText("Convert");
    expect(button).toBeDefined();
    await userEvent.click(button);

    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
