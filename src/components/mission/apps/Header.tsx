import Link from "next/link";

const Header = () => {
  return (
    <div className="flex mb-6 w-full justify-between">
      <span className="text-lg text-pearl font-semibold">APPS ON EVMOS</span>
      <div className="flex gap-2">
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://evmos.org/ecosystem"
          aria-label="docs"
        >
          <div className="flex justify-center text-pearl uppercase text-xs font-bold hover:bg-whiteOpacity border border-pearl p-2 rounded">
            <span>ECOSYSTEM</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
