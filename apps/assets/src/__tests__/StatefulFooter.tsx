import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MixpanelProvider } from "tracker";

import { StatefulFooter } from "../StatefulFooter";

describe("Testing for Footer", () => {
  it("shouldn't track CLICK_FEEDBACK_FOOTER because token is not defined", () => {
    // Define the wrapper component
    const Wrapper = ({ children }: { children: JSX.Element }) => (
      <MixpanelProvider token="testToken" config={{ ip: false }}>
        {children}
      </MixpanelProvider>
    );

    // Render the component with the wrapper
    const { debug } = render(<StatefulFooter />, { wrapper: Wrapper });
    console.log(debug);
  });
});
