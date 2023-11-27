// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const CardTitle = ({
  firstWord,
  secondWord,
}: {
  firstWord: string;
  secondWord: string;
}) => {
  return (
    <h1 className="mb-1 text-4xl font-bold text-[#FAF1E4] first-letter:uppercase">
      {firstWord} <span className="text-red">{secondWord}</span>
    </h1>
  );
};
