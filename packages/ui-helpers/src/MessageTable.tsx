// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const MessageTable = ({
  children,
  amountCols,
}: {
  children: JSX.Element;
  amountCols: number;
}) => {
  return (
    <tr className="assetOneItem">
      <td colSpan={amountCols} className="bg-darkGray2">
        <div className="my-4 flex items-center justify-center space-x-3 text-center font-semibold">
          {children}
        </div>
      </td>
    </tr>
  );
};
