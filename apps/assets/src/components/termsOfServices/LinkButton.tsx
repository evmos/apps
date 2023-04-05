import Link from "next/link";

const LinkButton = ({
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
      className="flex items-center border border-darkGray1 px-5 rounded hover:bg-grayOpacity font-bold"
    >
      {children}
    </Link>
  );
};

export default LinkButton;
