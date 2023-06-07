import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
// fireEvent
import "@testing-library/jest-dom";
import { MixpanelProvider } from "tracker";
import {
  CLICK_MISSION_CONTROL_ECOSYSTEM_BUTTON,
  LISTEN_MISSION_CONTROL_SCROLL_ECOSYSTEM,
} from "tracker";
import mixpanel from "mixpanel-browser";

import userEvent from "@testing-library/user-event";
import EvmosApps from "../components/mission/apps/EvmosApps";
import { successfullMixpanelEvent } from "../test-utils/utils";
import AppsContainer from "../components/mission/apps/AppsContainer";
// import AppsContainer from "../components/mission/apps/AppsContainer";

describe("Testing EvmosApps", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should calls mixpanel event after clicking on ecosystem", async () => {
    // Define the wrapper component
    const props = {
      comp: <EvmosApps />,
      event: CLICK_MISSION_CONTROL_ECOSYSTEM_BUTTON,
      getBy: "ECOSYSTEM",
    };
    await successfullMixpanelEvent(props);
  });

  // it("should calls mixpanel event after scrolling", async () => {
  //   // TODO:
  //   // Define the wrapper component
  //   const Wrapper = ({ children }: { children: JSX.Element }) => (
  //     <MixpanelProvider token="testToken" config={{ ip: false }}>
  //       {children}
  //     </MixpanelProvider>
  //   );

  //   // Render the component with the wrapper
  //   const { getByText, debug } = render(<EvmosApps />, {
  //     wrapper: Wrapper,
  //   });
  //   debug();
  //   const textElement = getByText(/ecosystem/i);
  //   expect(textElement).toBeInTheDocument();
  //   expect(mixpanel.init).toHaveBeenCalledTimes(1);
  //   fireEvent.scroll(textElement, { target: { scrollY: 100 } });

  //   expect(mixpanel.track).toHaveBeenCalledWith(
  //     LISTEN_MISSION_CONTROL_SCROLL_ECOSYSTEM,
  //     {
  //       percentageScrolled: 0,
  //     },
  //     {}
  //   );
  //   expect(mixpanel.track).toHaveBeenCalledTimes(1);

  //   // fireEvent.scroll(scrollContainer, { target: { scrollY: 100 } });
  // });
});
