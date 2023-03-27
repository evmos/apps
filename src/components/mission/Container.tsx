import Link from "next/link";

export const Container = ({
  text,
  value,
  href,
}: {
  text: string;
  value: string | JSX.Element;
  href?: string;
}) => {
  const drawDiv = () => (
    <div className="flex flex-col items-start">
      <div className="flex space-x-2">
        <span className="opacity-80">{text}</span>
      </div>
      <h2 className="text-2xl font-bold font-[GreyCliff]">{value}</h2>
    </div>
  );

  return (
    <>
      {href !== undefined && <Link href={href}>{drawDiv()}</Link>}
      {href === undefined && drawDiv()}
    </>
  );
};
