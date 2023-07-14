import { CheckIcon, CloseBorderIcon } from "icons";
import { STEP_STATUS } from "./utils";

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

type ButtonProps = {
  id: string;
  name: string;
  index: number;
  stepsLength: number;
  status: string;
  handleClick: () => Promise<void>;
  textError: string;
  statusButton: string;
};

const STYLE1 = {
  [STEP_STATUS.CURRENT]: "w-[1px] bg-[#DBD3D1]",
  [STEP_STATUS.DONE]: "w-[1.2px] bg-[#31B886]",
  [STEP_STATUS.PROCESSING]: "w-[1px] bg-[#DBD3D1]",
};

const STYLE2 = {
  [STEP_STATUS.CURRENT]: "border border-red bg-white",
  [STEP_STATUS.DONE]: "bg-[#31B886]",
  [STEP_STATUS.PROCESSING]: "border border-[#DBD3D1] bg-white",
};

const STYLE3 = {
  [STEP_STATUS.CURRENT]: "bg-red hover:bg-red1",
  [STEP_STATUS.DONE]: "pointer-events-none bg-[#31B886]",
  [STEP_STATUS.PROCESSING]: "bg-red hover:bg-red1",
};

export const ButtonCopilot = ({ props }: { props: ButtonProps }) => {
  return (
    <li
      key={props.id}
      className={classNames(
        props.index !== props.stepsLength - 1 ? "pb-10" : "",
        "relative list-none"
      )}
    >
      <>
        {props.index !== props.stepsLength - 1 ? (
          <div
            className={`absolute left-4 top-4 -ml-px mt-0.5 h-full ${
              STYLE1[props.status]
            }`}
            aria-hidden="true"
          />
        ) : null}
        <div className="group relative flex items-center">
          <span className="flex h-9 items-center">
            <span
              className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full
        ${STYLE2[props.status]}
        `}
            >
              {props.status === STEP_STATUS.DONE && (
                <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
              )}
            </span>
          </span>
          <button
            onClick={props.handleClick}
            className={`ml-4 w-full space-x-2 rounded-lg px-8
            py-2 font-[GreyCliff] text-lg font-normal normal-case tracking-wider text-pearl 
            ${
              props.statusButton === STEP_STATUS.NOT_PROCCESED
                ? "pointer-events-none opacity-70"
                : props.statusButton === STEP_STATUS.DONE
                ? "pointer-events-none bg-[#31B886]"
                : ""
            }
          ${STYLE3[props.status]}
          `}
          >
            {props.status === STEP_STATUS.PROCESSING && (
              <span className="loader"></span>
            )}
            <span>{props.name}</span>
            {props.status === STEP_STATUS.DONE && (
              <span role="img" aria-label="Celebration icon">
                🎉
              </span>
            )}
          </button>
        </div>
        {props.textError !== "" && (
          <div className="ml-4 flex items-center space-x-2  px-8 py-2 text-sm text-red">
            <CloseBorderIcon />
            <p>{props.textError}</p>
          </div>
        )}
      </>
    </li>
  );
};
