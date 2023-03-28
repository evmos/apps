import Link from "next/link";

const Header = () => {
  return (
    <div className="flex mb-6 w-full justify-between">
      <span className="text-lg text-pearl font-semibold">STAKING</span>
      <div className="flex gap-2">
        <Link
          href={{
            pathname: "/staking",
          }}
        >
          <div className="flex justify-center text-pearl uppercase text-xs font-bold hover:bg-whiteOpacity border border-pearl p-2 rounded">
            <span>VIEW STAKING</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
