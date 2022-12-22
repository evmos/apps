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
      flex justify-center text-pearl uppercase text-xs font-bold hover:bg-whiteOpacity border border-pearl px-3 md:px-4 py-3 rounded" ${
        disabled ? "disabled rounded" : "rounded"
      } `}
    >
      {children}
    </button>
  );
};

export default Button;
