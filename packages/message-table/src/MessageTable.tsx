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
        <div className="my-4 flex items-center justify-center space-x-3 text-center font-[GreyCliff] font-semibold">
          {children}
        </div>
      </td>
    </tr>
  );
};
