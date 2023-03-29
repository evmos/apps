import Link from "next/link";
import CommonWealthIcon from "../../footer/icons/CommonWealth";

const Header = () => {
  return (
    <div className="flex mb-6 w-full justify-between">
      <span className="text-lg text-pearl font-semibold">GOVERNANCE</span>
      <div className="flex gap-2">
        <Link
          href={{
            pathname: "/governance",
          }}
        >
          <div className="flex justify-center text-pearl uppercase text-xs font-bold hover:bg-whiteOpacity border border-pearl p-2 rounded">
            <span>VOTE</span>
          </div>
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://evmos.community"
          aria-label="docs"
        >
          <div className="flex justify-center text-pearl uppercase text-xs font-bold hover:bg-whiteOpacity border border-pearl p-2 rounded">
            <span>DOCS</span>
          </div>
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://commonwealth.im/evmos"
          aria-label="docs"
        >
          <div className="flex justify-center text-pearl uppercase text-xs font-bold hover:bg-whiteOpacity border border-pearl p-2 rounded">
            <CommonWealthIcon width={16} height={16} />
            <span>DISCUSSION</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
