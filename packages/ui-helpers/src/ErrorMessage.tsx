// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const ErrorMessage = ({ text }: { text: string }) => {
  return <p className="text-red pl-2 text-xs italic">{text}</p>;
};
