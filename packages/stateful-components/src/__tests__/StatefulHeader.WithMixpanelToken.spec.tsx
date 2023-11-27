import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { StatefulHeader } from "../StatefulHeader";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { MixpanelProvider } from "tracker";

describe("Testing Header with mixpanel token", () => {
  vi.mock("mixpanel-browser", () => {
    return {
      default: {
        init: vi.fn(),
        config: {},
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

  test("should call mixpanel after clicking on launchPad - dApp Store", async () => {
    const wrapper = ({ children }: { children: JSX.Element }) => {
      return (
        <MixpanelProvider token="testToken" config={{ ip: false }}>
          {children}
        </MixpanelProvider>
      );
    };

    const { getByText, getByRole } = render(
      <StatefulHeader pageName="Portfolio" page="assets" />,
      { wrapper }
    );
    const element = getByText("Portfolio");
    expect(element).toBeDefined();
    const launchPadButton = getByRole("button", { name: /launchpad/i });
    expect(launchPadButton).toBeDefined();
    await userEvent.click(launchPadButton);
    const dAppStore = getByText(/dapp store/i);
    expect(dAppStore).toBeDefined();
    await userEvent.click(dAppStore);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(
      "Click on dApp inside the Launcher",
      {
        dApp: "dAppStore",
      }
    );
  });
});
