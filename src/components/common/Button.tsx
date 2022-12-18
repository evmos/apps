const Button = ({
  children,
  onClick,
}: {
  children: JSX.Element;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex justify-center text-pearl uppercase text-xs font-bold hover:bg-whiteOpacity border border-pearl px-4 py-3 rounded"
    >
      {children}
    </button>
  );
};

export default Button;
