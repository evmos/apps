// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Countdown } from "@evmosapps/ui-helpers";
import { useEpochDay } from "../../../utils/hooks/useEpochDay";
import { FULL_DAY_MINUS_ONE_SECOND } from "constants-helper";

export const StatefulCountdown = () => {
  const { epochs, error } = useEpochDay();

  if (error) return null;

  return (
    <Countdown
      epochs={
        epochs > 1000 || epochs !== undefined
          ? epochs + FULL_DAY_MINUS_ONE_SECOND
          : "Loading..."
      }
    />
  );
};
