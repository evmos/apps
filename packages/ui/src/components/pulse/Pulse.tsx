// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const Pulse = () => {
  // add relative position to the container of the pulse
  return (
    <div>
      <span className="absolute flex h-4 w-4 -right-0.5 top-1 -translate-y-1/2">
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary dark:bg-primary-dark opacity-75"
          style={{ animationDuration: "3s" }}
        ></span>
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary dark:bg-primary-dark opacity-75"
          style={{ animationDuration: "3s", animationDelay: "1s" }}
        ></span>
      </span>
      <span className="right-0 top-1 -translate-y-1/2 absolute inline-flex rounded-full h-3 w-3 bg-primary dark:bg-primary-dark"></span>
    </div>
  );
};
