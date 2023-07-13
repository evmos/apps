import { useMemo, useState } from "react";
import { stepsSetAccount } from "./utils";
import { SuccessSetUp } from "./SuccessSetUp";
import { checkAllDoneStatus } from "../helpers";
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

  return isSetUpDone ? (
    <SuccessSetUp />
  ) : (
    <SetUpAccount
      stepsSetAccount={stepsSetAccount}
      groupState={groupState}
      setGroupState={setGroupState}
    />
  );
};
