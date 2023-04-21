// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const SimpleSnackbar = ({
  title,
  text,
}: {
  title: string;
  text?: string;
}) => {
  return (
    <div>
      <p>{title}</p>
      <p className="text-sm">{text}</p>
    </div>
  );
};
