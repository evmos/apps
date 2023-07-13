import { STEP_STATUS } from "./buttons/utils";
import { GroupStateI } from "./types";

export const checkAllDoneStatus = (groupState: GroupStateI[]) => {
  return groupState.every(
    (obj) => obj.hasOwnProperty("status") && obj.status === STEP_STATUS.DONE
  );
};
