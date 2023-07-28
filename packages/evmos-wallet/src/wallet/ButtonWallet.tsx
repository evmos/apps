// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const ButtonWallet = ({
  children,
  onClick,
  disabled,
}: {
  children: JSX.Element;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`hover:bg-grayOpacity border-darkPearl w-full rounded border px-4 py-3 capitalize shadow transition-all duration-300 hover:shadow-md ${
        disabled ? "disabled" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default ButtonWallet;
