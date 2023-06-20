import "./matchMedia.mock";
import "@testing-library/jest-dom";
import {
  CLICK_HIDE_ZERO_BALANCE,
  CLICK_BACK_TO_MC,
  CLICK_CTA_LINKS_REGISTER_TOKEN,
  CLICK_CTA_LINKS_ASSETS_GUIDE,
} from "tracker";
import AssetsTable from "../components/asset/table/AssetsTable";
import { successfullMixpanelEvent } from "../test-utils/utils";
import { NAV_TO_MISSION_CONTROL } from "constants-helper";
import { jest } from "@jest/globals";


describe("Testing Assets Table", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should calls mixpanel event after clicking on hide zero balance", async () => {
    const props = {
      comp: <AssetsTable />,
      event: CLICK_HIDE_ZERO_BALANCE,
      getBy: "checkbox",
      roleOptions: { name: "Hide Zero Balance" },
      trackProps: {
        status: true,
      },
    };
    await successfullMixpanelEvent(props);
  });

  it("should calls mixpanel event after clicking on back to mission control", async () => {
    const props = {
      comp: <AssetsTable />,
      event: CLICK_BACK_TO_MC,
      getBy: NAV_TO_MISSION_CONTROL,
    };
    await successfullMixpanelEvent(props);
  });

  it("should calls mixpanel event after clicking on register your token", async () => {
    const props = {
      comp: <AssetsTable />,
      event: CLICK_CTA_LINKS_REGISTER_TOKEN,
      getBy: "register your token",
    };
    await successfullMixpanelEvent(props);
  });

  const props = {
    comp: <AssetsTable />,
    event: CLICK_CTA_LINKS_ASSETS_GUIDE,
    getBy: "view the assets guide",
  };
  it("should calls mixpanel event after clicking on view the assets guide", async () => {
    await successfullMixpanelEvent(props);
  });
});
