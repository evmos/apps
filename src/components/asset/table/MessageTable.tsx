const MessageTable = ({
  children,
  amountCols,
}: {
  children: JSX.Element;
  amountCols: number;
}) => {
  return (
    <tr className="assetOneItem">
      <td colSpan={amountCols}>
        <div className="flex items-center space-x-3 justify-center font-semibold font-[GreyCliff] my-4">
          {children}
        </div>
      </td>
    </tr>
  );
};

export default MessageTable;
