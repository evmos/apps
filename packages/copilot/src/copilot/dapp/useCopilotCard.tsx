// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useContext, useEffect, useMemo, useState } from "react";
import { StepsContainerDapp } from "./StepsContainarDapp";
import { StoreType, getSequence, useEvmosBalance } from "evmos-wallet";
import { useSelector } from "react-redux";
import { steps } from "../container/data";
import {
  USER_CONNECTED_AND_HAS_NO_TOKENS,
  USER_CONNECTED_AND_HAS_TOKENS,
  USER_NOT_CONNECTED,
  useTracker,
} from "tracker";
import { StepsContext } from "../container/StepsContext";

export const useCopilotCard = () => {
  const [copilotSteps, setCopilotSteps] = useState(steps);
  const [sequence, setSequence] = useState(false);
  const value = useSelector((state: StoreType) => state.wallet.value);
  const { evmosBalance } = useEvmosBalance();
  const { resetSteps } = useContext(StepsContext);

  const tempEvmosBalance = useMemo(() => {
    return evmosBalance.isZero();
  }, [evmosBalance]);

  const tempValue = useMemo(() => {
    return value;
  }, [value]);

  const { handlePreClickAction: notConnected } = useTracker(USER_NOT_CONNECTED);

  const { handlePreClickAction: connectedWithTokensEvent } = useTracker(
    USER_CONNECTED_AND_HAS_TOKENS
  );
  const { handlePreClickAction: connectedWithoutTokensEvent } = useTracker(
    USER_CONNECTED_AND_HAS_NO_TOKENS
  );

  // Track if user is not connected to an account
  useEffect(() => {
    if (copilotSteps[0].status === "current" && !tempValue.active) {
      //
      notConnected();
    }
  }, [copilotSteps, tempValue]);

  // Update status of the steps
  useEffect(() => {
    if (copilotSteps[0].status === "current" && tempValue.active) {
      setCopilotSteps((prev) => {
        const updatedState = [...prev];
        updatedState[0].status = "done";
        updatedState[1].status = "current";
        return updatedState;
      });
    }
  }, [copilotSteps, tempValue]);

  // Reset steps
  useEffect(() => {
    if (copilotSteps[0].status === "done" && !tempValue.active) {
      resetSteps();
      setCopilotSteps((prev) => {
        const updatedState = [...prev];
        updatedState[0].status = "current";
        updatedState[1].status = "not_processed";
        updatedState[2].status = "not_processed";
        return updatedState;
      });
    }
  }, [copilotSteps, tempValue]);

  // Trake if user is connected to an account and has Evmos
  useEffect(() => {
    if (copilotSteps[1].status === "current" && !tempEvmosBalance) {
      connectedWithTokensEvent();
      setCopilotSteps((prev) => {
        const updatedState = [...prev];
        updatedState[1].status = "done";
        updatedState[2].status = "current";
        return updatedState;
      });
    }
  }, [copilotSteps, tempEvmosBalance]);

  // Track if user is connected to an account and has no Evmos
  useEffect(() => {
    if (
      copilotSteps[1].status === "current" &&
      tempEvmosBalance &&
      tempValue.active
    ) {
      connectedWithoutTokensEvent();
    }
  }, [copilotSteps, tempEvmosBalance, tempValue]);

  const stepsToDraw = useMemo(() => {
    if (copilotSteps.length === 1) {
      return;
    }
    return copilotSteps.map((step) => {
      return <StepsContainerDapp key={step.title} step={step} />;
    });
  }, [copilotSteps]);

  const drawButton = useMemo(() => {
    return copilotSteps.map((item) => {
      return <div key={item.index}>{item.buttonDapp(item.status)}</div>;
    });
  }, [copilotSteps]);

  useEffect(() => {
    async function getSequenceNumber() {
      if (tempValue.evmosAddressCosmosFormat === "") {
        setSequence(false);
        return;
      }
      const sequenceNumber = await getSequence(
        "https://rest.bd.evmos.org:1317",
        tempValue.evmosAddressCosmosFormat
      );
      if (sequenceNumber === "0" || sequenceNumber === null) {
        setSequence(false);
        return;
      }
      if (sequenceNumber !== "0") {
        setSequence(true);
      }
    }

    getSequenceNumber().catch(console.error);
  }, [sequence, tempValue]);

  return { stepsToDraw, drawButton, sequence };
};
