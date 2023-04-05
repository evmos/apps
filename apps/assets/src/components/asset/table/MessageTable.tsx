const MessageTable = ({ children }: { children: JSX.Element }) => {
  return (
    <tr className="assetOneItem">
      <td colSpan={4}>
        <div className="flex items-center justify-center space-x-3 font-[GreyCliff] font-bold">
          {children}
        </div>
      </td>
    </tr>
  );
};

export default MessageTable;
