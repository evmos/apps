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
    th: {
      style: string;
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
              <th className={`${tableProps.th.style}`} key={item}>
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
