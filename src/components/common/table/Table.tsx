export const Table = ({
  tableProps,
}: {
  tableProps: {
    table: {
      style: string;
    };
    tHead: {
      style: string;
      content: string[];
    };
    tBody: {
      style: string;
      content: JSX.Element[] | JSX.Element | JSX.Element[][];
    };
  };
}) => {
  return (
    <table className={`${tableProps.table.style}`}>
      <thead className={`${tableProps.tHead.style} `}>
        <tr>
          {tableProps.tHead.content.map((item) => {
            return (
              <th className="first:pl-8 py-4 sticky top-0 bg-black" key={item}>
                {item}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className={`${tableProps.tBody.style}`}>
        {tableProps.tBody.content}
      </tbody>
    </table>
  );
};
