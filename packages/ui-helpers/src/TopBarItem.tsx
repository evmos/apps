// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Link from "next/link";

export const TopBarItem = ({
  text,
  value,
  href,
}: {
  text: string;
  value: string | JSX.Element;
  href?: string;
}) => {
  const drawDiv = () => (
    <div>
      <div className="flex items-center justify-center space-x-2">
        <h5 className="text-sm font-normal opacity-80">{text}</h5>
      </div>
      <h2 className="font-[GreyCliff] text-2xl font-bold">{value}</h2>
    </div>
  );

  return (
    <>
      {href !== undefined && <Link href={href}>{drawDiv()}</Link>}
      {href === undefined && drawDiv()}
    </>
  );
};
