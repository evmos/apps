import Link from "next/link";
import CommonWealthIcon from "../../footer/icons/CommonWealth";

const Header = () => {
  return (
    <div className="flex mb-6 w-full justify-between">
      <span className="text-xl text-pearl font-bold font-[GreyCliff]">
        GOVERNANCE
      </span>
      <div className="flex gap-2">
        <Link
          href={{
            pathname: "/governance",
          }}
        >
          {/* TODO: use button component */}
          <div className="flex justify-center text-pearl uppercase text-xs font-bold hover:bg-whiteOpacity border border-pearl p-2 rounded font-[GreyCliff]">
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
          <div className="flex justify-center text-pearl uppercase text-xs font-bold hover:bg-whiteOpacity border border-pearl p-2 rounded font-[GreyCliff]">
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
          <div className="flex justify-center text-pearl uppercase text-xs font-bold hover:bg-whiteOpacity border border-pearl p-2 rounded font-[GreyCliff]">
            <CommonWealthIcon width={16} height={16} />
            <span>DISCUSSION</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
