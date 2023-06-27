import { test, describe, beforeEach, afterEach, vi } from "vitest";
import { MixpanelProvider } from "tracker";
import { CLICK_FEEDBACK_FOOTER } from "tracker";
import { StatefulFooter } from "../StatefulFooter";
import { render } from "@testing-library/react";
import { expect } from "vitest";
import { OverridedMixpanel } from "mixpanel-browser";
import mixpanel from "mixpanel-browser";
import userEvent from "@testing-library/user-event";

vi.mock("evmos-wallet", async () => {
  return {
    ButtonWalletConnection: vi.fn(),
    StoreType: vi.fn(),
  };
});

vi.mock("react-redux", async () => {
  return {
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
  };
});

vi.mock("mixpanel-browser", async () => {
  const actual = (await vi.importActual(
    "mixpanel-browser"
  )) as OverridedMixpanel;
  return {
    ...actual,
    init: vi.fn(),
    track: vi.fn(),
  };
});

describe("Testing for Footer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window.localStorage, "setItem");
    vi.spyOn(window.localStorage, "getItem");
    vi.spyOn(mixpanel, "init");
    vi.spyOn(mixpanel, "track");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const wrapper = ({ children }: { children: JSX.Element }) => {
    return (
      <MixpanelProvider token="testToken" config={{ ip: false }}>
        {children}
      </MixpanelProvider>
    );
  };

  const props = {
    comp: <StatefulFooter />,
    event: CLICK_FEEDBACK_FOOTER,
    getBy: "Feedback",
  };
  test("should calls mixpanel event after clicking on Feedback", async () => {
    const { getByText, getByRole } = render(props.comp, {
      wrapper: wrapper,
    });
    const element = getByText(props.getBy);

    // expect(element).toBeInTheDocument();
    expect(mixpanel.init).toHaveBeenCalledTimes(1);
    // await successfullMixpanelEvent(props);

    await userEvent.click(element);
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_FEEDBACK_FOOTER, {
      token: "testToken",
    });
    expect(mixpanel.track).toHaveBeenCalledTimes(1);
  });
});
