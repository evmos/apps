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
      className="w-full rounded-2xl bg-[#E1DDD7] px-8 py-2 font-bold"
    >
      {text}
    </button>
  );
};
export default GrayButton;
