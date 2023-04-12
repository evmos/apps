import Link from "next/link";

export const LinkButton = ({
  href,
  target,
  children,
}: {
  href: string;
  target?: string;
  children: JSX.Element;
}) => {
  return (
    <Link
      href={href}
      target={target}
      className="flex items-center rounded border border-darkGray1 px-5 font-bold hover:bg-grayOpacity"
    >
      {children}
    </Link>
  );
};
