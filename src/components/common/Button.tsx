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
      flex justify-center text-pearl uppercase text-xs font-bold hover:bg-whiteOpacity border border-pearl px-1 py-2 md:p-2 rounded" ${
        disabled ? "disabled rounded" : "rounded"
      } `}
    >
      {children}
    </button>
  );
};

export default Button;
