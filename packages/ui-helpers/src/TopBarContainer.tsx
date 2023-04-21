// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const TopBarContainer = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="mx-5 mb-5 grid grid-cols-[repeat(auto-fit,186px)] items-center justify-center gap-3 rounded-2xl bg-darkGray2 p-5 px-5 text-center font-[IBM] text-sm text-pearl md:justify-between xl:mx-0">
      {children}
    </div>
  );
};
