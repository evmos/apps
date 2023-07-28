// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const SmallButton = ({
  onClick,
  text,
  className,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string | JSX.Element;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`${
        className !== undefined ? className : ""
      } rounded border border-black px-3 py-0.5 text-xs font-bold text-black opacity-80 hover:opacity-50`}
    >
      {text}
    </button>
  );
};
