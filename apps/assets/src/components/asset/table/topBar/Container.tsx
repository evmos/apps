import Link from "next/link";

export const Container = ({
  text,
  value,
  href,
}: {
  text: string;
  value: string;
  href: string;
}) => {
  return (
    <Link href={href} className={` ${href === "" ? "cursor-default" : ""} `}>
      <div className="flex items-center justify-center space-x-2">
        <h5 className="opacity-80">{text}</h5>
      </div>
      <h2 className="text-2xl font-bold font-[GreyCliff]">{value}</h2>
    </Link>
  );
};
