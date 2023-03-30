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
      } bg-red text-pearl uppercase w-full rounded px-8 py-2 text-lg font-bold font-[GreyCliff] hover:bg-red1  ${
        disabled ? "disabled" : ""
      }`}
    >
      {text}
    </button>
  );
};

export default ConfirmButton;
