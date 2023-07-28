// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { CheckIcon, CloseBorderIcon } from "icons";
import { STEP_STATUS } from "./utils";
import { HandsEmoji } from "../../icons/HandsEmoji";

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

const LINE_STYLES = {
  [STEP_STATUS.CURRENT]: "w-[1px] bg-strokeGrey",
  [STEP_STATUS.DONE]: "w-[1.2px] bg-green1",
  [STEP_STATUS.PROCESSING]: "w-[1px] bg-strokeGrey",
};

const CIRCLE_STYLES = {
  [STEP_STATUS.CURRENT]: "border border-red bg-white",
  [STEP_STATUS.DONE]: "bg-green1",
  [STEP_STATUS.PROCESSING]: "border border-strokeGrey bg-white",
};

const BUTTON_STYLES = {
  [STEP_STATUS.CURRENT]: "bg-red hover:bg-red1 ",
  [STEP_STATUS.DONE]: "pointer-events-none bg-green1",
  [STEP_STATUS.PROCESSING]:
    "bg-red hover:bg-red1 pointer-events-none opacity-70",
};

export const ButtonCopilot = ({ props }: { props: ButtonProps }) => {
  return (
    <li
      key={props.id}
      className={classNames(
        props.index !== props.stepsLength - 1 ? "pb-8" : "",
        "relative list-none"
      )}
    >
      <>
        {props.index !== props.stepsLength - 1 ? (
          <div
            className={`absolute left-4 top-4 -ml-px mt-0.5 h-full ${
              LINE_STYLES[props.status]
            }`}
            aria-hidden="true"
          />
        ) : null}
        <div className="group relative flex items-center">
          <span className="flex h-9 items-center">
            <span
              className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full
              ${
                props.statusButton === STEP_STATUS.NOT_PROCESSED
                  ? "border-strokeGrey border bg-white"
                  : ""
              }
        ${CIRCLE_STYLES[props.status]}
        `}
            >
              {props.status === STEP_STATUS.DONE && (
                <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
              )}
            </span>
          </span>
          <button
            onClick={props.handleClick}
            className={`text-pearl ml-4 w-full space-x-2 rounded-lg
            px-8 py-2 font-normal  normal-case shadow transition-all duration-300 hover:shadow-md
            ${
              props.statusButton === STEP_STATUS.NOT_PROCESSED
                ? "pointer-events-none opacity-70"
                : props.statusButton === STEP_STATUS.DONE
                ? "bg-green1 pointer-events-none"
                : ""
            }
          ${BUTTON_STYLES[props.status]}
          `}
          >
            {props.status === STEP_STATUS.PROCESSING && (
              <span className="loader"></span>
            )}
            <span>{props.name}</span>
            {props.status === STEP_STATUS.DONE && <HandsEmoji />}
          </button>
        </div>
        {props.textError !== "" && (
          <div className="text-red ml-4 flex items-center  space-x-2 px-8 py-2 text-sm">
            <CloseBorderIcon />
            <p>{props.textError}</p>
          </div>
        )}
      </>
    </li>
  );
};
