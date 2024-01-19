// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { Switch } from "@evmosapps/ui-helpers";
import { CLICK_TOGGLE_FOR_VALIDATORS, sendEvent } from "tracker";
import {
  useValidatorContext,
  ValidatorStateContext,
} from "../context/ValidatorStateContext";

const ValidatorToggle = () => {
  const { value, handleSetValue } =
    useValidatorContext() as ValidatorStateContext;

  return (
    <Switch
      label={"Show Inactive"}
      onChange={() => {
        handleSetValue(!value);
        sendEvent(CLICK_TOGGLE_FOR_VALIDATORS);
      }}
      checked={value}
    />
  );
};

export default ValidatorToggle;
