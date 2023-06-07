import "@testing-library/jest-dom";
// import "./matchMedia.mock";
import { CLICK_EVMOS_LOGO } from "tracker";
import { StatefulHeader } from "../StatefulHeader";
import { successfullMixpanelEvent } from "../test-utils/utils";

// TODO: mock wagmi ?
describe("Testing for Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window.localStorage.__proto__, "setItem");
    jest.spyOn(window.localStorage.__proto__, "getItem");
  });

  afterEach(() => {
    window.localStorage.__proto__.setItem.mockRestore();
    window.localStorage.__proto__.getItem.mockRestore();
  });

  const pageName = "assets";
  const props = {
    comp: <StatefulHeader pageName={pageName} />,
    event: CLICK_EVMOS_LOGO,
    getBy: "link",
    trackProps: {
      page: pageName,
      provider: "2",
      wallet: "1",
    },
  };

  it("should calls mixpanel event after clicking on Logo", async () => {
    await successfullMixpanelEvent(props);
  });

  // it("should calls mixpanel - token is not set - do not track", async () => {
  //   await tokenNotSetAvoidMixpanelEvent(props);
  // });
});
