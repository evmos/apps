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
    <div>
      <div className="flex items-center justify-center space-x-2">
        <h5 className="opacity-80 text-sm font-normal">{text}</h5>
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
