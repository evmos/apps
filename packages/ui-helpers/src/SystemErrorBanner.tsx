// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const SystemErrorBanner = ({
  text,
}: {
  text: string | React.ReactNode;
}) => {
  return (
    <div
      className={`rounded-md text-pearl flex items-center justify-between space-x-2 bg-red p-4 px-5 font-[GreyCliff] font-medium text-black`}
    >
      {text}
    </div>
  );
};
