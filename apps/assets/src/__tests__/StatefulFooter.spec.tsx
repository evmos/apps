import "./matchMedia.mock";
import "@testing-library/jest-dom";
import { CLICK_FEEDBACK_FOOTER } from "tracker";
import { StatefulFooter } from "../StatefulFooter";
import {
  disableCookiesAndAvoidMixpanelEvent,
  enableCookiesAndSuccessfullMixpanelEvent,
  successfullMixpanelEvent,
} from "../test-utils/utils";
import { jest } from "@jest/globals";

describe("Testing for Footer", () => {
  beforeEach(() => {
    // jest.clearAllMocks();
    window.localStorage.clear();
    jest.spyOn(window.localStorage.__proto__, "setItem");
    jest.spyOn(window.localStorage.__proto__, "getItem");
  });

  afterEach(() => {
    window.localStorage.__proto__.setItem.mockRestore();
    window.localStorage.__proto__.getItem.mockRestore();
  });

  const props = {
    comp: <StatefulFooter />,
    event: CLICK_FEEDBACK_FOOTER,
    getBy: "Feedback",
  };
  it("should calls mixpanel event after clicking on Feedback", async () => {
    await successfullMixpanelEvent(props);
  });

  it("should calls mixpanel - enable cookies with cookies settings button", async () => {
    await enableCookiesAndSuccessfullMixpanelEvent(props);
  });

  it("should calls mixpanel - disable cookies with cookies settings button and don't track", async () => {
    await disableCookiesAndAvoidMixpanelEvent(props);
  });

  // it("should calls mixpanel - token is not set - do not track", async () => {
  //   await tokenNotSetAvoidMixpanelEvent(props);
  // });
});
