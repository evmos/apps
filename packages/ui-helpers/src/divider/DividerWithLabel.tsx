// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const DividerWithLabel = ({ label }: { label: string }) => {
  return (
    <div className="relative ">
      <div
        className="absolute left-1/2 right-0 top-1/2 flex w-20 -translate-x-1/2 -translate-y-1/2 transform items-center bg-red-600"
        aria-hidden="true"
      >
        <div className="w-full border-t border-[#858B97]" />
      </div>
      <div className="relative flex justify-center text-[#858B97]">
        <span className="bg-white px-2 text-sm text-gray-500 ">{label}</span>
      </div>
    </div>
  );
};
