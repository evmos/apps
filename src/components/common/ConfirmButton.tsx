const ConfirmButton = ({
  text,
  onClick,
  disabled,
  className,
}: {
  text: string | JSX.Element;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`${
        className !== undefined ? className : ""
      } bg-red text-white uppercase w-full rounded px-8 py-2 text-lg font-bold font-[GreyCliff] hover:bg-red1  ${
        disabled ? "disabled" : ""
      }`}
    >
      {text}
    </button>
  );
};

export default ConfirmButton;
