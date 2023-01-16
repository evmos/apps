const HeadTable = () => {
  return (
    <thead className="uppercase">
      <tr>
        <th className="text-left px-8 py-4 min-w-[350px] 2xl:min-w-[550px]">
          Asset
        </th>
        <th className="text-left min-w-[200px]">Total Balance</th>
        {/* <th className="text-left min-w-[200px]">IBC Balance</th> */}
        <th></th>
      </tr>
    </thead>
  );
};

export default HeadTable;
