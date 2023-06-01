import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MixpanelProvider } from "tracker";
import { CLICK_EVMOS_LOGO } from "tracker";
import mixpanel from "mixpanel-browser";
import { StatefulHeader } from "../StatefulHeader";
import userEvent from "@testing-library/user-event";
describe("Testing for Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const pageName = "assets";
  it("should calls mixpanel event after clicking on Logo", async () => {
    // should I simulate the wallet connection too ?
    // which is the best approach ?
    // evmos-wallet is not working, I tried adding it on jest.shared.config but it didnt work
    // have to try with internet connection

    // can I reuse the click on cookies settings ??
    // Define the wrapper component
    const Wrapper = ({ children }: { children: JSX.Element }) => (
      <MixpanelProvider token="testToken" config={{ ip: false }}>
        {children}
      </MixpanelProvider>
    );

    // Render the component with the wrapper
    const { getByRole } = render(<StatefulHeader pageName={pageName} />, {
      wrapper: Wrapper,
    });
    const textElement = getByRole("link");
    expect(textElement).toBeInTheDocument();
    expect(mixpanel.init).toHaveBeenCalledTimes(1);

    await userEvent.click(textElement);
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_EVMOS_LOGO, {
      page: pageName,
      provider: "2",
      wallet: "1",
    });
    expect(mixpanel.track).toHaveBeenCalledTimes(1);
  });

  // how I simulate saving the value in localstorage ?
  // how I change the config property on the mock ?

  // Cases: shouldn't track event if token is not set
  // Shouldn't track event if disableTracker is true - I need localstorage for this.
});
