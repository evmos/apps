// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Link from "next/link";
import { LeftArrowIcon } from "icons";

export const Navigation = ({
  href,
  text,
  onClick,
}: {
  href: string;
  text: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) => {
  return (
    <Link
      href={href}
      className="mx-5 mb-2 flex w-fit items-center justify-center space-x-3 font-bold text-pearl hover:opacity-80 xl:mx-0 xl:justify-start"
      onClick={onClick}
    >
      <LeftArrowIcon width={15} height={15} />
      <p>{text}</p>
    </Link>
  );
};
