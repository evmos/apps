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
    <Link href={href} className={`${href === "" ? "cursor-default" : ""} `}>
      <h5 className="opacity-80">{text}</h5>
      <h2 className="text-2xl font-bold font-[GreyCliff]">{value}</h2>
    </Link>
  );
};
