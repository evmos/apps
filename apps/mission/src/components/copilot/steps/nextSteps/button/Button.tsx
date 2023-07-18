// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const Button = ({
  handleClick,
  children,
}: {
  handleClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      className="flex cursor-pointer flex-col items-center space-y-2 rounded-lg border border-[#D1D5DB] px-4 py-5"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
