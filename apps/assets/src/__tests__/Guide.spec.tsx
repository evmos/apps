import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MixpanelProvider } from "tracker";
import { CLICK_CTA_LINKS_REGISTER_TOKEN } from "tracker";
import mixpanel from "mixpanel-browser";

import userEvent from "@testing-library/user-event";
import Guide from "../components/asset/table/Guide";
describe("Testing Guide", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should calls mixpanel event after clicking on register your token", async () => {
    // Define the wrapper component
    const Wrapper = ({ children }: { children: JSX.Element }) => (
      <MixpanelProvider token="testToken" config={{ ip: false }}>
        {children}
      </MixpanelProvider>
    );

    // Render the component with the wrapper
    const { getByRole } = render(<Guide />, {
      wrapper: Wrapper,
    });
    // is it better to getByRole or byText or how ? And why?
    const textElement = getByRole("link");
    expect(textElement).toBeInTheDocument();
    expect(mixpanel.init).toHaveBeenCalledTimes(1);

    await userEvent.click(textElement);
    expect(mixpanel.track).toHaveBeenCalledWith(
      CLICK_CTA_LINKS_REGISTER_TOKEN,
      {}
    );
    expect(mixpanel.track).toHaveBeenCalledTimes(1);
  });
});
