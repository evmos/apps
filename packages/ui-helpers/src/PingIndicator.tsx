// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const PingIndicator = ({
  children,
  showPing,
}: {
  children: JSX.Element;
  showPing: boolean;
}) => {
  return (
    <div className="relative inline-flex">
      {showPing && (
        <span className="absolute right-1 top-1 flex h-3 w-3">
          <span className="bg-red absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
          <span className="bg-red relative inline-flex h-3 w-3 rounded-full"></span>
        </span>
      )}
      {children}
    </div>
  );
};
