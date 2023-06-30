import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { StatefulFooter } from "../StatefulFooter";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { MixpanelProvider } from "tracker";

describe("Testing Footer", () => {
  vi.mock("mixpanel-browser", async () => {
    return {
      default: {
        init: vi.fn(),
        config: {},
        track: vi.fn(),
      },
    };
  });

  test("should call mixpanel after clicking on feedback", async () => {
    const wrapper = ({ children }: { children: JSX.Element }) => {
      return (
        <MixpanelProvider token="testToken" config={{ ip: false }}>
          {children}
        </MixpanelProvider>
      );
    };

    const { getByText } = render(<StatefulFooter />, { wrapper });
    const element = getByText("Feedback");
    expect(element).toBeDefined();
    await userEvent.click(element);

    expect(mixpanel.init).toHaveBeenCalledOnce();
    console.log(mixpanel.track);
    expect(mixpanel.track).toHaveBeenCalledWith(
      "Click on Give Feedback on Footer",
      {}
    );
  });

  // test("track without token", async () => {
  //   const wrapperWithoutToken = ({ children }: { children: JSX.Element }) => {
  //     console.log("wrapper without token");
  //     return (
  //       <MixpanelProvider token="" config={{ ip: false }}>
  //         {children}
  //       </MixpanelProvider>
  //     );
  //   };
  //   // const spyTrack = vi.spyOn(mixpanel, "track");
  //   const spy = vi.spyOn(mixpanel, "init");
  //   const spyTrack = vi.spyOn(mixpanel, "track");
  //   const { getByText } = render(<StatefulFooter />, {
  //     wrapper: wrapperWithoutToken,
  //   });

  //   // spy.mockClear();
  //   // console.log(mixpanel);
  //   const element = getByText("Feedback");
  //   expect(element).toBeDefined();
  //   await userEvent.click(element);
  //   // spy.mockReset();
  //   expect(spy).toHaveBeenCalledOnce();
  //   expect(spyTrack).not.toHaveBeenCalled();
  // });
});
