// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { PROMPTED_TO, disableMixpanel } from "tracker";
import { PropsWithChildren } from "react";
import { TransferModalContent } from "./TransferModalContent";
import { RootProviders } from "stateful-components/src/root-providers";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../vitest.setup";

vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));

vi.mock("react", async (importOriginal: () => Promise<{}>) => {
  return {
    ...(await importOriginal()),
    cache: (fn: unknown) => fn,
    "server-only": {},
  };
});
// eslint-disable-next-line no-secrets/no-secrets
const RECEIVER = "evmos1c8wgcmqde5jzymrjrflpp8j20ss000c00zd0ak";
vi.mock("wagmi", async (importOriginal: () => Promise<{}>) => {
  return {
    ...(await importOriginal()),
    useAccount: () => {
      return {
        isDisconnected: false,
        address: RECEIVER,
      };
    },
  };
});

vi.mock("wagmi/actions", async (importOriginal: () => Promise<{}>) => {
  return {
    ...(await importOriginal()),
    getAccount: () => {
      return {
        connector: {
          id: "metaMask",
        },
      };
    },
  };
});

vi.mock(
  "@evmosapps/evmos-wallet",
  async (importOriginal: () => Promise<{}>) => {
    return {
      ...(await importOriginal()),
      useFee: () => {
        return {
          fee: {
            gasLimit: 1n,
            token: "evmos:EVMOS",
          },
          isPending: false,
        };
      },
      useTokenBalance: () => {
        return {
          balance: 1n,
          isFetching: false,
        };
      },
    };
  },
);

describe("Testing Transfer Modal Content", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };

  test("should call mixpanel event for top up in send modal", async () => {
    render(
      <TransferModalContent
        receiver={RECEIVER}
        networkPrefix="evmos"
        token="evmos:EVMOS"
        amount={1n}
        setState={vi.fn()}
        setIsOpen={vi.fn()}
      />,
      { wrapper },
    );
    const button = await screen.findByRole("button", { name: /top-up evmos/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(PROMPTED_TO, {
      Modal: "Send Modal",
      "Prompt To": "Top Up",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should call mixpanel event for satellite ", async () => {
    render(
      <TransferModalContent
        receiver={RECEIVER}
        networkPrefix="axelar"
        token="axelar:axlUSDC"
        amount={1n}
        setState={vi.fn()}
        setIsOpen={vi.fn()}
      />,
      { wrapper },
    );
    const button = await screen.findByRole("button", {
      name: /go to satellite/i,
    });
    expect(button).toBeDefined();

    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(PROMPTED_TO, {
      Modal: "Send Modal",
      "Prompt To": "Satellite",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should call mixpanel event for connect with keplr", async () => {
    render(
      <TransferModalContent
        receiver={RECEIVER}
        networkPrefix="axelar"
        token="evmos:EVMOS"
        amount={1n}
        setState={vi.fn()}
        setIsOpen={vi.fn()}
      />,
      { wrapper },
    );
    const button = await screen.findByRole("button", {
      name: /install keplr/i,
    });
    expect(button).toBeDefined();

    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(PROMPTED_TO, {
      Modal: "Send Modal",
      "Prompt To": "Install Keplr",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for top up in send modal", async () => {
    disableMixpanel();
    render(
      <TransferModalContent
        receiver={RECEIVER}
        networkPrefix="evmos"
        token="evmos:EVMOS"
        amount={1n}
        setState={vi.fn()}
        setIsOpen={vi.fn()}
      />,
      { wrapper },
    );
    const button = await screen.findByRole("button", { name: /top-up evmos/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should not call mixpanel event for satellite ", async () => {
    disableMixpanel();
    render(
      <TransferModalContent
        receiver={RECEIVER}
        networkPrefix="axelar"
        token="axelar:axlUSDC"
        amount={1n}
        setState={vi.fn()}
        setIsOpen={vi.fn()}
      />,
      { wrapper },
    );
    const button = await screen.findByRole("button", {
      name: /go to satellite/i,
    });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should not call mixpanel event for connect with keplr", async () => {
    disableMixpanel();
    render(
      <TransferModalContent
        receiver={RECEIVER}
        networkPrefix="axelar"
        token="evmos:EVMOS"
        amount={1n}
        setState={vi.fn()}
        setIsOpen={vi.fn()}
      />,
      { wrapper },
    );
    const button = await screen.findByRole("button", {
      name: /install keplr/i,
    });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
