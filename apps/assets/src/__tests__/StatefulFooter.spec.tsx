import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MixpanelProvider } from "tracker";
import { CLICK_FEEDBACK_FOOTER } from "tracker";
import mixpanel from "mixpanel-browser";
import { StatefulFooter } from "../StatefulFooter";
import userEvent from "@testing-library/user-event";
describe("Testing for Footer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should calls mixpanel event after clicking on Feedback", async () => {
    // Define the wrapper component
    const Wrapper = ({ children }: { children: JSX.Element }) => (
      <MixpanelProvider token="testToken" config={{ ip: false }}>
        {children}
      </MixpanelProvider>
    );

    // Render the component with the wrapper
    const { getByText } = render(<StatefulFooter />, {
      wrapper: Wrapper,
    });
    const textElement = getByText("Feedback");
    expect(textElement).toBeInTheDocument();
    expect(mixpanel.init).toHaveBeenCalledTimes(1);

    await userEvent.click(textElement);
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_FEEDBACK_FOOTER, {});
    expect(mixpanel.track).toHaveBeenCalledTimes(1);
  });

  it("should calls mixpanel - enable cookies with cookies settings button", async () => {
    //  how I reuse the Wrapper and the getByText ?
    const Wrapper = ({ children }: { children: JSX.Element }) => (
      <MixpanelProvider token="testToken" config={{ ip: false }}>
        {children}
      </MixpanelProvider>
    );

    const { getByText } = render(<StatefulFooter />, {
      wrapper: Wrapper,
    });

    const cookiesElement = getByText(/cookies settings/i);
    expect(cookiesElement).toBeInTheDocument();
    await userEvent.click(cookiesElement);
    const acceptButton = getByText(/accept all/i);
    await userEvent.click(acceptButton);
    expect(mixpanel.init).toHaveBeenCalledTimes(1);
    const textElement = getByText(/feedback/i);
    expect(textElement).toBeInTheDocument();

    await userEvent.click(textElement);
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_FEEDBACK_FOOTER, {});
    expect(mixpanel.track).toHaveBeenCalledTimes(1);
  });

  // how I simulate saving the value in localstorage ?
  // how I change the config property on the mock ?

  // Cases: shouldn't track event if token is not set
  // Shouldn't track event if disableTracker is true - I need localstorage for this.
});
