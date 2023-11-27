// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const SystemErrorBanner = ({
  text,
}: {
  text: string | React.ReactNode;
}) => {
  return (
    <div
      className={`text-pearl bg-red flex items-center justify-between space-x-2 rounded-md p-4 px-5 font-medium text-black`}
    >
      {text}
    </div>
  );
};
