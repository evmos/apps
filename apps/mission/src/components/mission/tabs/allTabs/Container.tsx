// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

const Container = ({ children }: { children: JSX.Element }) => {
  return <div className="max-h-72 overflow-y-auto">{children}</div>;
};

export default Container;
