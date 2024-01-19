// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const AmountItem = ({
  text,
  amount,
}: {
  text: string;
  amount: string;
}) => {
  return (
    <div className="space-y-2">
      <p className="smallText">{text}</p>
      <p className="text-2xl">{amount} EVMOS</p>
    </div>
  );
};
