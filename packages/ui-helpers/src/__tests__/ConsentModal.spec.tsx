import { test, describe, beforeEach, afterEach, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { ConsentModal } from "../termsOfServices/ConsentModal";
import { DISABLE_TRACKER_LOCALSTORAGE } from "tracker";

describe("Consent Modal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window.localStorage, "setItem");
    vi.spyOn(window.localStorage, "getItem");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const setShow = vi.fn();
  const { getByRole } = render(<ConsentModal setShow={setShow} />);
  test("should set localstorage to false when clicks on accept", async () => {
    const button = getByRole("button", { name: /accept/i });
    await userEvent.click(button);
    expect(localStorage.getItem(DISABLE_TRACKER_LOCALSTORAGE)).toBe("false");
  });

  test("should set localstorage to true when clicks on reject", async () => {
    const button = getByRole("button", { name: /reject/i });
    await userEvent.click(button);
    expect(localStorage.getItem(DISABLE_TRACKER_LOCALSTORAGE)).toBe("true");
  });
});
