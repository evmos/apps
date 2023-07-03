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
    expect(mixpanel.track).toHaveBeenCalledWith(
      "Click on Give Feedback on Footer",
      {}
    );
  });
});
