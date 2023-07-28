// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

// use this if you want to show a loading, error,
// or some message while the data is fetching
export const BannerMessages = ({
  text,
  spinner,
  className,
}: {
  text: string;
  spinner?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={`bg-darkGray2 text-pearl mx-5 mb-5 flex items-center justify-center space-x-2 rounded-2xl p-5 px-5 text-center font-[GreyCliff] text-sm font-bold md:col-span-2 md:mx-0 ${
        className !== undefined ? className : ""
      }`}
    >
      {spinner && <span className="loader"></span>}
      <p>{text}</p>
    </div>
  );
};
