const Button = ({
  children,
  onClick,
  disabled,
}: {
  children: JSX.Element;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`
      rounded" flex justify-center border border-pearl p-2 text-xs font-bold uppercase text-pearl hover:bg-whiteOpacity ${
        disabled ? "disabled rounded" : "rounded"
      } `}
    >
      {children}
    </button>
  );
};

export default Button;
