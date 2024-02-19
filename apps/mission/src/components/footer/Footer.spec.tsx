// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  CLICK_ON_FOOTER_CTA,
  disableMixpanel,
  localMixpanel as mixpanel,
} from "tracker";
import { Footer } from "./Footer";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../vitest.setup";

describe("Testing Footer", () => {
  test("should call mixpanel event for build with evmos - Footer", async () => {
    render(await Footer());
    const button = screen.getByRole("link", { name: /build with us/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Build with evmos",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for build with evmos - Footer", async () => {
    disableMixpanel();
    render(await Footer());
    const button = screen.getByRole("link", { name: /build with us/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call mixpanel event for Github - Footer", async () => {
    render(await Footer());
    const button = screen.getByLabelText(/github evmos/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Github",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for Github - Footer", async () => {
    disableMixpanel();
    render(await Footer());
    const button = screen.getByLabelText(/github evmos/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Github",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should call mixpanel event for Twitter - Footer", async () => {
    render(await Footer());
    const button = screen.getByLabelText(/Twitter evmos/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "X",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for Twitter - Footer", async () => {
    disableMixpanel();
    render(await Footer());
    const buildButton = screen.getByLabelText(/Twitter evmos/i);
    expect(buildButton).toBeDefined();
    await userEvent.click(buildButton);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call mixpanel event for Discord - Footer", async () => {
    render(await Footer());
    const button = screen.getByLabelText(/Discord evmos/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Discord",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for Discord - Footer", async () => {
    disableMixpanel();
    render(await Footer());
    const button = screen.getByLabelText(/Discord evmos/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call mixpanel event for Telegram - Footer", async () => {
    render(await Footer());
    const button = screen.getByLabelText(/Telegram evmos/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Telegram",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for Telegram - Footer", async () => {
    disableMixpanel();
    render(await Footer());
    const button = screen.getByLabelText(/Telegram evmos/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call mixpanel event for Medium - Footer", async () => {
    render(await Footer());
    const button = screen.getByLabelText(/Medium evmos/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Medium",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for Medium - Footer", async () => {
    disableMixpanel();
    render(await Footer());
    const button = screen.getByLabelText(/Medium evmos/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call mixpanel event for Commonwealth - Footer", async () => {
    render(await Footer());
    const button = screen.getByLabelText(/Commonwealth evmos/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Commonwealth",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for Commonwealth - Footer", async () => {
    disableMixpanel();
    render(await Footer());
    const button = screen.getByLabelText(/Commonwealth evmos/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call mixpanel event for Terms of Service - Footer", async () => {
    render(await Footer());
    const button = screen.getByRole("link", { name: /Terms of Service/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Terms of service",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for Terms of Service - Footer", async () => {
    disableMixpanel();
    render(await Footer());
    const button = screen.getByRole("link", { name: /Terms of Service/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call mixpanel event for Privacy Policy - Footer", async () => {
    render(await Footer());
    const button = screen.getByRole("link", { name: /Privacy Policy/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Privacy Statement",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for Privacy Policy - Footer", async () => {
    disableMixpanel();
    render(await Footer());
    const button = screen.getByRole("link", { name: /Privacy Policy/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call mixpanel event for Cookies Settings - Footer", async () => {
    render(await Footer());
    const button = screen.getByLabelText(/Cookies Settings/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_FOOTER_CTA, {
      "Footer Social Type": "Cookie Statement",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for Cookies Settings - Footer", async () => {
    disableMixpanel();
    render(await Footer());
    const button = screen.getByLabelText(/Cookies Settings/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
