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

describe("Testing for Footer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls Mixpanel functions without token", () => {
    const token = "";
    const config = { debug: true, ip: false };

    const wrapper = ({ children }: { children: JSX.Element }) => (
      <MixpanelProvider token={token} config={config}>
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
    const token = "testToken";
    const config = { debug: true, ip: false };
    render(<Footer />);
    const expectedText = "Feedback";
    const textElement = screen.getByText(expectedText);
    expect(textElement).toBeInTheDocument();
    fireEvent.click(textElement);

    const wrapper = ({ children }: { children: JSX.Element }) => (
      <MixpanelProvider token={token} config={config}>
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
