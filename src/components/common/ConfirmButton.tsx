const ConfirmButton = ({
  text,
  onClick,
  disabled,
}: {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-red text-white uppercase w-full rounded-lg px-8 py-4 text-lg font-bold ${
        disabled ? "disabled" : ""
      }`}
    >
      {text}
    </button>
  );
};

export default ConfirmButton;
