// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

const HeadTable = () => {
  return (
    <thead className="uppercase">
      <tr>
        <th className="min-w-[350px] px-8 py-4 text-left 2xl:min-w-[550px]">
          Asset
        </th>
        <th className="min-w-[200px] text-left">Total Balance</th>
        <th></th>
      </tr>
    </thead>
  );
};

export default HeadTable;
