const MessageTable = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <tr>
        <td colSpan={4} className="border-b-0"></td>
      </tr>
      <tr>
        <td colSpan={4} className="border-b-0">
          <div className="flex items-center space-x-3 justify-center font-bold font-[GreyCliff]">
            {children}
          </div>
        </td>
      </tr>
      <tr>
        <td colSpan={4}></td>
      </tr>
    </>
  );
};

export default MessageTable;
