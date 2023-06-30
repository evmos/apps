import { test, describe, beforeEach, afterEach, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { ConsentModal } from "../termsOfServices/ConsentModal";
import { DISABLE_TRACKER_LOCALSTORAGE } from "tracker";
import { MixpanelProvider, useTracker } from "tracker";
import { renderHook, act } from "@testing-library/react";
import mixpanel from "mixpanel-browser";

vi.mock("mixpanel-browser", () => {
  return {
    default: {
      init: vi.fn(),
      config: {},
      track: vi.fn(),
    },
  };
});
describe("Consent Modal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window.localStorage, "setItem");
    vi.spyOn(window.localStorage, "getItem");
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
  const setShow = vi.fn();
  const { getByRole } = render(<ConsentModal setShow={setShow} />, { wrapper });

  test("should set localstorage to false when clicks on accept", async () => {
    const button = getByRole("button", { name: /accept/i });
    await userEvent.click(button);
    expect(localStorage.getItem(DISABLE_TRACKER_LOCALSTORAGE)).toBe("false");

    const { result } = renderHook(
      () => useTracker("event", { prop: "value" }),
      { wrapper }
    );
    /* eslint-disable */
    expect(mixpanel.init).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.handlePreClickAction({ extraProp: "extraValue" });
    });
    expect(mixpanel.track).toHaveBeenCalledWith("event", {
      prop: "value",
      extraProp: "extraValue",
    });
  });

  test("should set localstorage to true when clicks on reject", async () => {
    const button = getByRole("button", { name: /reject/i });
    await userEvent.click(button);
    expect(localStorage.getItem(DISABLE_TRACKER_LOCALSTORAGE)).toBe("true");

    const { result } = renderHook(
      () => useTracker("event", { prop: "value" }),
      { wrapper }
    );

    expect(mixpanel.init).toHaveBeenCalledTimes(1);
    act(() => {
      result.current.handlePreClickAction({ extraProp: "extraValue" });
    });
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
