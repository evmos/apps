// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Link from "next/link";
import { ExternalLinkIcon } from "icons";

import { useTracker, CLICK_COMMONWEALTH_OUTLINK } from "tracker";

const BannerBlack = ({ text, href }: { text: string; href: string }) => {
  const { handlePreClickAction } = useTracker(CLICK_COMMONWEALTH_OUTLINK);
  return (
    <Link
      rel="noopener noreferrer"
      target="_blank"
      href={href}
      onClick={() => {
        handlePreClickAction();
      }}
    >
      <div className="mx-4 my-4 flex items-center justify-between rounded-2xl border-4 border-darkGray2 bg-black p-5 font-bold text-pearl md:mx-0">
        <span>{text}</span>
        <ExternalLinkIcon width={28} height={28} />
      </div>
    </Link>
  );
  //
};

export default BannerBlack;
