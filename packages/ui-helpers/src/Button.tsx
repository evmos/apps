// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const Button = ({
  children,
  onClick,
  disabled,
  className,
}: {
  children: JSX.Element;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`
      border-pearl text-pearl hover:bg-whiteOpacity flex w-fit justify-center rounded border p-2 font-[GreyCliff] text-xs font-bold uppercase ${
        disabled ? "disabled rounded" : "rounded"
      } 
        ${className !== undefined ? className : ""}
        `}
    >
      {children}
    </button>
  );
};
