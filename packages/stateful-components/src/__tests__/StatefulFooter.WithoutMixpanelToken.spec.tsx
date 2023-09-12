import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { StatefulFooter } from "../StatefulFooter";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { MixpanelProvider } from "tracker";

describe("Testing Footer - mixpanel is not setted", () => {
  vi.mock("mixpanel-browser", () => {
    return {
      default: {
        init: vi.fn(),
        track: vi.fn(),
      },
    };
  });

  test("should not call mixpanel after clicking on feedback", async () => {
    const wrapperWithoutToken = ({ children }: { children: JSX.Element }) => {
      return (
        <MixpanelProvider token="" config={{ ip: false }}>
          {children}
        </MixpanelProvider>
      );
    };

    const { getByText } = render(<StatefulFooter />, {
      wrapper: wrapperWithoutToken,
    });
    const element = getByText("Feedback");
    expect(element).toBeDefined();
    await userEvent.click(element);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
