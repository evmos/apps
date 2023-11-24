// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

const HeadAssets = () => {
  return (
    <div className="text-sm sticky top-0 z-[1] hidden w-full items-center bg-darkGray1 font-bold uppercase lg:flex">
      <div className="w-[5%]"></div>
      <div className="w-[50%] space-x-5 py-4 text-left">Asset</div>
      <div className="mr-8 w-[50%] space-x-5 text-right lg:mr-0 lg:text-left">
        Total Balance
      </div>
    </div>
  );
};

export default HeadAssets;
