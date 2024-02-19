// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  CLICK_SEARCH_VALIDATORS_INPUT,
  disableMixpanel,
  localMixpanel as mixpanel,
} from "tracker";

import Search from "./Search";
import { SearchWrapper } from "../../context/SearchContext";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../../vitest.setup";

describe("Testing Toggle Validators ", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <SearchWrapper>{children}</SearchWrapper>;
  };

  test("should call mixpanel event for clicking on search validators", async () => {
    render(<Search placeholder="Search Validators" />, { wrapper });
    const button = screen.getByPlaceholderText(/search validators/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_SEARCH_VALIDATORS_INPUT, {
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for clicking on search validators", async () => {
    disableMixpanel();
    render(<Search placeholder="Search Validators" />, { wrapper });
    const button = screen.getByPlaceholderText(/search validators/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
