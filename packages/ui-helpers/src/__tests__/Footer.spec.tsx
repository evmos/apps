import mixpanel from "mixpanel-browser";
import { Footer } from "../Footer";
import {
  fireEvent,
  screen,
  render,
  renderHook,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { CLICK_FEEDBACK_FOOTER, MixpanelProvider, useTracker } from "tracker";
import {
  CONFIG,
  EMPTY_TOKEN,
  TOKEN,
  eventTriggerByText,
} from "./testConstants";

describe("Testing for Footer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls Mixpanel functions without token", () => {
    const wrapper = ({ children }: { children: JSX.Element }) => (
      <MixpanelProvider token={EMPTY_TOKEN} config={CONFIG}>
        {children}
      </MixpanelProvider>
    );

    const { result } = renderHook(() => useTracker(CLICK_FEEDBACK_FOOTER), {
      wrapper,
      initialProps: {
        children: <Footer />,
      },
    });

    expect(mixpanel.init).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.handlePreClickAction();
    });
    // TODO: it should be 0 instead of 1
    expect(mixpanel.track).toHaveBeenCalledTimes(1);
  });

  it("calls Mixpanel functions with token", () => {
    render(<Footer />);
    const expectedText = "Feedback";
    eventTriggerByText(expectedText);

    const wrapper = ({ children }: { children: JSX.Element }) => (
      <MixpanelProvider token={TOKEN} config={CONFIG}>
        {children}
      </MixpanelProvider>
    );

    const { result } = renderHook(() => useTracker(CLICK_FEEDBACK_FOOTER), {
      wrapper,
      initialProps: {
        children: <Footer />,
      },
    });

    expect(mixpanel.init).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.handlePreClickAction();
    });
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_FEEDBACK_FOOTER, {});
    expect(mixpanel.track).toHaveBeenCalledTimes(1);
  });
});
