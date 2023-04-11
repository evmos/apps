import Link from "next/link";
import CommonWealthIcon from "../../footer/icons/CommonWealth";

const Header = () => {
  return (
    <div className="mb-6 flex w-full justify-between">
      <span className="font-[GreyCliff] text-xl font-bold text-pearl">
        GOVERNANCE
      </span>
      <div className="flex gap-2">
        <Link
          href={{
            pathname: "/governance",
          }}
        >
          {/* TODO: use button component */}
          <div className="flex justify-center rounded border border-pearl p-2 font-[GreyCliff] text-xs font-bold uppercase text-pearl hover:bg-whiteOpacity">
            <span>VOTE</span>
          </div>
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://evmos.community"
          aria-label="docs"
        >
          {/* TODO: use button component */}
          <div className="flex justify-center rounded border border-pearl p-2 font-[GreyCliff] text-xs font-bold uppercase text-pearl hover:bg-whiteOpacity">
            <span>DOCS</span>
          </div>
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://commonwealth.im/evmos"
          aria-label="docs"
        >
          {/* TODO: use button component */}
          <div className="flex justify-center rounded border border-pearl p-2 font-[GreyCliff] text-xs font-bold uppercase text-pearl hover:bg-whiteOpacity">
            <CommonWealthIcon width={16} height={16} />
            <span>DISCUSSION</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
