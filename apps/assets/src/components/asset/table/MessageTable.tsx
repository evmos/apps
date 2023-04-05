const MessageTable = ({ children }: { children: JSX.Element }) => {
  return (
    <tr className="assetOneItem">
      <td colSpan={4}>
        <div className="flex items-center space-x-3 justify-center font-bold font-[GreyCliff]">
          {children}
        </div>
      </td>
    </tr>
  );
};

export default MessageTable;
