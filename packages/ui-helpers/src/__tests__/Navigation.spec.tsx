import mixpanel from "mixpanel-browser";
import {
  fireEvent,
  screen,
  render,
  renderHook,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { CLICK_BACK_TO_MC, MixpanelProvider, useTracker } from "tracker";
import { Navigation } from "../Navigation";
import { NAV_TO_MISSION_CONTROL, EVMOS_PAGE_URL } from "constants-helper";
describe("Testing for Navigation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const myFunction = () => {
    const token = "testToken";
    const config = { debug: true, ip: false };
    render(<Navigation href={EVMOS_PAGE_URL} text={NAV_TO_MISSION_CONTROL} />);
    const expectedText = NAV_TO_MISSION_CONTROL;
    const textElement = screen.getByText(expectedText);
    expect(textElement).toBeInTheDocument();
    fireEvent.click(textElement);

    const wrapper = ({ children }: { children: JSX.Element }) => (
      <MixpanelProvider token={token} config={config}>
        {children}
      </MixpanelProvider>
    );

    return wrapper;
  };

  it("Navigation: track back to mission control click", () => {
    const wrapper = myFunction();
    const { result } = renderHook(() => useTracker(CLICK_BACK_TO_MC), {
      wrapper,
      initialProps: {
        children: (
          <Navigation href={EVMOS_PAGE_URL} text={NAV_TO_MISSION_CONTROL} />
        ),
      },
    });

    expect(mixpanel.init).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.handlePreClickAction();
    });
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_BACK_TO_MC, {});
    expect(mixpanel.track).toHaveBeenCalledTimes(1);
  });
});
