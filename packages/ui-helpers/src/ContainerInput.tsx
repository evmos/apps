// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const ContainerInput = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="flex items-center space-x-3 rounded border border-darkGray5 bg-white py-2 pr-5 pl-4 focus-within:border-darkGray5 hover:border-darkGray5 focus-visible:border-darkGray5">
      {children}
    </div>
  );
};
