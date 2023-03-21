import Link from "next/link";
import ExternalLinkIcon from "../images/icons/ExternalLinkIcon";

const BannerBlack = ({ text, href }: { text: string; href: string }) => {
  return (
    <Link rel="noopener noreferrer" target="_blank" href={href}>
      <div className="font-[GreyCliff] items-center flex justify-between bg-black text-pearl border-4 border-darkGray2 font-bold p-5 my-4 mx-4 md:mx-0 rounded-2xl">
        <span>{text}</span>
        <ExternalLinkIcon width={28} height={28} />
      </div>
    </Link>
  );
  //
};

export default BannerBlack;
