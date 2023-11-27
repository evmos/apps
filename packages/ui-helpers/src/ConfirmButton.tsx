// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type ConfirmButtonProps = {
  text: string | JSX.Element;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
};

export const ConfirmButton = ({
  text,
  onClick,
  disabled,
  className,
}: ConfirmButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${
        className !== undefined ? className : "w-full"
      } bg-red text-pearl hover:bg-red1 rounded px-8 py-2 text-lg font-bold uppercase ${
        disabled ? "disabled" : ""
      }`}
    >
      {text}
    </button>
  );
};
