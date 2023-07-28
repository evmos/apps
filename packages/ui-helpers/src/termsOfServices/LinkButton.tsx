// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Link from "next/link";

export const LinkButton = ({
  href,
  target,
  children,
}: {
  href: string;
  target?: string;
  children: JSX.Element;
}) => {
  return (
    <Link
      href={href}
      target={target}
      className="border-darkGray1 hover:bg-grayOpacity flex items-center rounded border px-5 font-bold"
    >
      {children}
    </Link>
  );
};
