// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const Container = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="grid min-h-screen min-w-[300px] bg-black">
      <div className="flex h-full w-full flex-col overflow-auto bg-auto bg-center bg-repeat px-0 font-[GreyCliff] sm:px-5 xl:px-14">
        {children}
      </div>
    </div>
  );
};
