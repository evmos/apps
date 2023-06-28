import { test, describe } from "vitest";
import { StatefulHeader } from "../StatefulHeader";
import { vi } from "vitest";
import { CLICK_EVMOS_LOGO } from "tracker";
import {
  // successfullMixpanelEvent,
  tokenNotSetAvoidMixpanelEvent,
} from "../test-utils/utils";

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
describe("Testing Header", () => {
  const pageName = "assets";
  const props = {
    comp: <StatefulHeader pageName={pageName} />,
    event: CLICK_EVMOS_LOGO,
    getBy: "link",
    trackProps: {
      page: pageName,
      provider: undefined,
      wallet: undefined,
    },
  };

  // test("should call mixpanel event after clicking on Logo", async () => {
  //   await successfullMixpanelEvent(props);
  // });

  test("should not call mixpanel event after clicking on Logo", async () => {
    await tokenNotSetAvoidMixpanelEvent(props);
  });
});
