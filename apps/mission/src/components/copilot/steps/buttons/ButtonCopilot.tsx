import { CheckIcon } from "icons";
// TODO: remove it
// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

type ButtonProps = {
  id: string;
  name: string;
  index: number;
  stepsLength: number;
  status: string;
  handleClick: any;
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
              props.status === "complete"
                ? " w-[1.2px] bg-red"
                : props.status === "current"
                ? " w-[1px] bg-[#DBD3D1]"
                : "w-[1px] bg-[#DBD3D1]"
            }`}
            aria-hidden="true"
          />
        ) : null}
        <div className="group relative flex items-center">
          <span className="flex h-9 items-center">
            <span
              className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full
        ${
          props.status === "complete"
            ? "bg-[#31B886]"
            : props.status === "current"
            ? "border border-red bg-white"
            : "border border-[#DBD3D1] bg-white"
        }
        `}
            >
              {props.status === "complete" && (
                <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
              )}
            </span>
          </span>
          <button
            onClick={props.handleClick}
            className={`ml-4 w-full rounded-lg px-8 py-2 font-[GreyCliff]
            text-lg font-normal normal-case tracking-wider text-pearl 
          ${
            props.status === "complete"
              ? "pointer-events-none bg-[#31B886]"
              : props.status === "upcoming"
              ? "pointer-events-none bg-red hover:bg-red1"
              : "bg-red hover:bg-red1"
          }
          `}
          >
            {props.name}
          </button>
        </div>
      </>
    </li>
  );
};
