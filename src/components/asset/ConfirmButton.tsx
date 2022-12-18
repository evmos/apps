const ConfirmButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-red text-white uppercase w-full rounded-lg px-8 py-4 text-lg font-bold"
    >
      {text}
    </button>
  );
};

export default ConfirmButton;
