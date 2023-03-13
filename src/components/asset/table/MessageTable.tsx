const MessageTable = ({
  children,
  amountCols,
}: {
  children: JSX.Element;
  amountCols: number;
}) => {
  return (
    <tr className="">
      <td colSpan={amountCols} className="bg-darkGray2">
        <div className="flex text-center items-center space-x-3 justify-center font-semibold font-[GreyCliff] my-4">
          {children}
        </div>
      </td>
    </tr>
  );
};

export default MessageTable;
