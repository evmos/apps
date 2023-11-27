"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Switch } from "@evmosapps/ui-helpers";
import { CLICK_SHOW_INACTIVE_TOGGLE, useTracker } from "tracker";
import {
  useValidatorContext,
  ValidatorStateContext,
} from "../context/ValidatorStateContext";

const ValidatorToggle = () => {
  const { value, handleSetValue } =
    useValidatorContext() as ValidatorStateContext;
  const { handlePreClickAction } = useTracker(CLICK_SHOW_INACTIVE_TOGGLE, {
    status: !value,
  });
  return (
    <Switch
      label={"Show Inactive"}
      onChange={() => {
        handleSetValue(!value);
        handlePreClickAction();
      }}
      checked={value}
    />
  );
};

export default ValidatorToggle;
