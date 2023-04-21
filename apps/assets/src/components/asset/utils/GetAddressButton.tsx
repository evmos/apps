// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

const GetButtonAddress = ({
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
      className={`rounded border border-darkPearl px-4 py-1 font-bold capitalize hover:bg-grayOpacity ${
        disabled ? "disabled" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default GetButtonAddress;
