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
      className="border-gray300 flex cursor-pointer flex-col items-center space-y-2 rounded-lg border px-4 py-5 shadow transition-all duration-300 hover:shadow-md"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
