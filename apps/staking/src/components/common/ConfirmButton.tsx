import { ConfirmButtonProps } from "./types";

const ConfirmButton = ({
  text,
  onClick,
  disabled,
  className,
}: ConfirmButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${
        className !== undefined ? className : ""
      } w-fit rounded bg-red px-8 py-2 font-[GreyCliff] text-lg font-bold uppercase text-pearl hover:bg-red1  ${
        disabled ? "disabled" : ""
      }`}
    >
      {text}
    </button>
  );
};

export default ConfirmButton;
