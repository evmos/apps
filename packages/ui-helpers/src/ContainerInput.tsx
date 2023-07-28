// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const ContainerInput = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="border-darkGray5 focus-within:border-darkGray5 hover:border-darkGray5 focus-visible:border-darkGray5 flex items-center space-x-3 rounded border bg-white py-2 pl-4 pr-5">
      {children}
    </div>
  );
};
