import Link from "next/link";
import ExternalLinkIcon from "../../../common/images/icons/ExternalLink";

const RedirectLink = ({ href, text }: { href: string; text: string }) => {
  return (
    <>
      <Link rel="noopener noreferrer" target="_blank" href={href}>
        <div className="mt-11 flex w-full items-center justify-center space-x-3 rounded bg-red px-8 py-2 font-[GreyCliff] text-lg font-bold uppercase text-white hover:bg-red1">
          <span>{text}</span> <ExternalLinkIcon />
        </div>
      </Link>
      <p className="text-center text-sm text-darkGray2">
        Clicking on this link will redirect you to an external site.
      </p>
    </>
  );
};

export default RedirectLink;
