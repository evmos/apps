import Link from "next/link";
import ExternalLinkIcon from "../images/icons/ExternalLinkIcon";

const BannerBlack = ({ text, href }: { text: string; href: string }) => {
  return (
    <Link rel="noopener noreferrer" target="_blank" href={href}>
      <div className="flex justify-between bg-black text-pearl border-4 border-darkGray2 font-bold p-5 my-4 mx-4 xl:mx-0 rounded-2xl">
        <span>{text}</span>
        <ExternalLinkIcon />
      </div>
    </Link>
  );
  //
};

export default BannerBlack;
