// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const ContainerModal = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="space-y-2 rounded bg-skinTan px-7 py-4">{children}</div>
  );
};
