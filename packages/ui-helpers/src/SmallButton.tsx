export const SmallButton = ({
  onClick,
  text,
  className,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string | JSX.Element;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`${
        className !== undefined ? className : ""
      } rounded border border-black py-0.5 px-3 text-xs font-bold text-black opacity-80 hover:opacity-50`}
    >
      {text}
    </button>
  );
};
