import { useEffect, useMemo, useState } from "react";
import { stepsSetAccount } from "./utils";
import { SuccessSetUp } from "./SuccessSetUp";
import { checkAllDoneStatus } from "./helpers";
import { SetUpAccount } from "./SetUpAccount";

export const SetUpAccountContainer = () => {
  const [groupState, setGroupState] = useState(
    stepsSetAccount.map((step, index) => ({
      id: step.id,
      index,
      status: step.status,
    }))
  );

  const isSetUpDone = useMemo(() => {
    return checkAllDoneStatus(groupState);
  }, [groupState]);

  const [showComponent, setShowComponent] = useState(false);
  useEffect(() => {
    setInterval(() => {
      if (isSetUpDone) {
        setShowComponent(true);
      }
    }, 400);
  }, [isSetUpDone]);

  return isSetUpDone && showComponent ? (
    <SuccessSetUp />
  ) : (
    <SetUpAccount
      stepsSetAccount={stepsSetAccount}
      groupState={groupState}
      setGroupState={setGroupState}
    />
  );
};
