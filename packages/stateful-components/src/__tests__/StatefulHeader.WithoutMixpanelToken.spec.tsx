import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { StatefulHeader } from "../StatefulHeader";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { MixpanelProvider } from "tracker";

describe("Testing Header - mixpanel is not setted", () => {
  vi.mock("mixpanel-browser", () => {
    return {
      default: {
        init: vi.fn(),
        track: vi.fn(),
      },
    };
  });

  vi.mock("react-redux", () => {
    return {
      useDispatch: vi.fn(),
      useSelector: vi.fn(),
    };
  });

  vi.mock("@evmosapps/evmos-wallet", () => {
    return {
      ButtonWalletConnection: vi.fn(),
      StoreType: vi.fn(),
      useAssets: vi.fn(() => ({
        evmosPriceFixed: 0,
      })),
      WalletConnection: vi.fn(),
    };
  });

  test("should not call mixpanel after clicking on launchPad - dApp Store", async () => {
    const wrapperWithoutToken = ({ children }: { children: JSX.Element }) => {
      return (
        <MixpanelProvider token="" config={{ ip: false }}>
          {children}
        </MixpanelProvider>
      );
    };

    const { getByText, getByRole } = render(
      <StatefulHeader pageName="Portfolio" page="assets" />,
      {
        wrapper: wrapperWithoutToken,
      },
    );
    const element = getByText("Portfolio");
    expect(element).toBeDefined();
    const launchPadButton = getByRole("button", { name: /launchpad/i });
    expect(launchPadButton).toBeDefined();
    await userEvent.click(launchPadButton);
    const dAppStore = getByText(/dapp store/i);
    expect(dAppStore).toBeDefined();
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
