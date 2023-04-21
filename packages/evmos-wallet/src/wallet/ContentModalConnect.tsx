// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

const ContentModalConnect = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="flex items-center space-x-5 text-lg font-bold">
      {children}
    </div>
  );
};

export default ContentModalConnect;
