import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MixpanelProvider } from "tracker";
import { CLICK_CTA_LINKS_ASSETS_GUIDE } from "tracker";
import mixpanel from "mixpanel-browser";

import userEvent from "@testing-library/user-event";
import AssetsGuide from "../components/asset/modals/AssetsGuide";
describe("Testing for Assets Guide", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should calls mixpanel event after clicking on view the assets guide", async () => {
    // Define the wrapper component
    const Wrapper = ({ children }: { children: JSX.Element }) => (
      <MixpanelProvider token="testToken" config={{ ip: false }}>
        {children}
      </MixpanelProvider>
    );

    // Render the component with the wrapper
    const { getByText } = render(<AssetsGuide />, {
      wrapper: Wrapper,
    });
    const textElement = getByText(/view the assets guide/i);
    expect(textElement).toBeInTheDocument();
    expect(mixpanel.init).toHaveBeenCalledTimes(1);

    await userEvent.click(textElement);
    expect(mixpanel.track).toHaveBeenCalledWith(
      CLICK_CTA_LINKS_ASSETS_GUIDE,
      {}
    );
    expect(mixpanel.track).toHaveBeenCalledTimes(1);
  });
});
