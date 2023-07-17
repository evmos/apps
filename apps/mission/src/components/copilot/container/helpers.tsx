import { STEP_STATUS } from "../steps/setUpAccount/buttons/utils";
import { CheckIcon } from "icons";

export const TEXT_STYLES = {
  [STEP_STATUS.CURRENT]: "text-red",
  [STEP_STATUS.NOT_PROCESSED]: "text-[#806E6B]",
  [STEP_STATUS.DONE]: "text-[#806E6B]",
};

export const CIRCLE_STYLES = {
  [STEP_STATUS.DONE]: (
    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-red text-pearl">
      <CheckIcon width={"14px"} height={"14px"} color="#fff" />
    </div>
  ),
  [STEP_STATUS.CURRENT]: (
    <span
      className="flex h-4 w-4 items-center justify-center"
      aria-hidden="true"
    >
      <span className="absolute h-4 w-4 rounded-full bg-[#FED2CA]" />
      <span className="relative block h-2 w-2 rounded-full bg-red" />
    </span>
  ),
  [STEP_STATUS.NOT_PROCESSED]: (
    <div
      className="relative flex h-4 w-4 items-center justify-center"
      aria-hidden="true"
    >
      <div className="h-2 w-2 rounded-full bg-[#DBD3D1]" />
    </div>
  ),
};

export interface stepsStatusI {
  status: string;
  index: number;
  component: JSX.Element;
  title: string;
}
