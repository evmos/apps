import { test, describe, vi } from "vitest";
import { CLICK_FEEDBACK_FOOTER } from "tracker";
import { StatefulFooter } from "../StatefulFooter";
import { OverridedMixpanel } from "mixpanel-browser";

import {
  successfullMixpanelEvent,
  // tokenNotSetAvoidMixpanelEvent,
} from "../test-utils/utils";
// import { cleanup } from "@testing-library/react";
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

describe("Testing Footer", () => {
  const props = {
    comp: <StatefulFooter />,
    event: CLICK_FEEDBACK_FOOTER,
    getBy: "Feedback",
  };

  test("should call mixpanel event after clicking on Feedback", async () => {
    await successfullMixpanelEvent(props);
  });

  // test("should not call mixpanel event after clicking on Feedback", async () => {
  //   await tokenNotSetAvoidMixpanelEvent(props);
  // });
});
