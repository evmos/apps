// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Dispatch, SetStateAction } from "react";

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
    setSorting: Dispatch<
      SetStateAction<{ column: number; direction: boolean }>
    >;
    sorting: { column: number; direction: boolean };
  };
}) => {
  return (
    <table className={`${tableProps.table.style}`}>
      <thead className={`${tableProps.tHead.style} `}>
        <tr>
          {tableProps.tHead.content.map((item, index) => {
            return (
              <th
                className={`${tableProps.th.style}`}
                key={item}
                onClick={() => {
                  if (tableProps.sorting.column === index) {
                    tableProps.setSorting({
                      column: index,
                      direction: !tableProps.sorting.direction,
                    });
                  } else {
                    tableProps.setSorting({
                      column: index,
                      direction: true,
                    });
                  }
                }}
              >
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
