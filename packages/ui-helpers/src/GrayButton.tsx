const GrayButton = ({
  text,
  onClick,
}: {
  text: JSX.Element;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      onClick={onClick}
      className="font-bold rounded-2xl bg-[#E1DDD7] px-8 py-2 w-full"
    >
      {text}
    </button>
  );
};
export default GrayButton;
