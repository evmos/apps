const SmallButton = ({
  onClick,
  text,
  className,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`${
        className !== undefined ? className : ""
      } border border-black rounded py-0.5 px-3 opacity-80 font-bold text-black text-xs hover:opacity-50`}
    >
      {text}
    </button>
  );
};

export default SmallButton;
