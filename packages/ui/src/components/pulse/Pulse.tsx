// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const Pulse = () => {
  // add relative position to the container of the pulse
  return (
    <div
      className="before:content-[''] before:absolute before:top-1.5 before:right-0 
before:-translate-y-1/2 before:w-[15px] before:h-[15px] before:lg:w-[12px] before:lg:h-[12px] before:animate-pulse before:bg-primary before:dark:bg-primary-dark before:rounded-full"
    />
  );
};
