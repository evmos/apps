import Link from "next/link";
import ExternalLinkIcon from "../../../common/images/icons/ExternalLink";

const RedirectLink = ({ href, text }: { href: string; text: string }) => {
  return (
    <>
      <Link rel="noopener noreferrer" target="_blank" href={href}>
        <div className="mt-11 flex items-center justify-center space-x-3 bg-red text-pearl uppercase w-full rounded px-8 py-2 text-lg font-bold font-[GreyCliff] hover:bg-red1">
          <span>{text}</span> <ExternalLinkIcon />
        </div>
      </Link>
      <p className="text-sm text-darkGray2 text-center">
        Clicking on this link will redirect you to an external site.
      </p>
    </>
  );
};

export default RedirectLink;
