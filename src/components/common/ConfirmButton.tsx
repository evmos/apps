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
      className={`bg-red text-white uppercase w-full rounded px-8 py-2 text-lg font-bold font-[GreyCliff] hover:bg-red1 ${
        disabled ? "disabled" : ""
      }`}
    >
      {text}
    </button>
  );
};

export default ConfirmButton;
