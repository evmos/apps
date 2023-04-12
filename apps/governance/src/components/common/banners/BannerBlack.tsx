import Link from "next/link";
import { ExternalLinkIcon } from "icons";

const BannerBlack = ({ text, href }: { text: string; href: string }) => {
  return (
    <Link rel="noopener noreferrer" target="_blank" href={href}>
      <div className="my-4 mx-4 flex items-center justify-between rounded-2xl border-4 border-darkGray2 bg-black p-5 font-[GreyCliff] font-bold text-pearl md:mx-0">
        <span>{text}</span>
        <ExternalLinkIcon width={28} height={28} />
      </div>
    </Link>
  );
  //
};

export default BannerBlack;
