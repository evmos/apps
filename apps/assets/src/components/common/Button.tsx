const Button = ({
  children,
  onClick,
  disabled,
  className,
}: {
  children: JSX.Element;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`
      flex justify-center text-pearl uppercase text-xs font-bold hover:bg-whiteOpacity border border-pearl p-2 rounded font-[GreyCliff]" ${
        disabled ? "disabled rounded" : "rounded"
      } 
        ${className !== undefined ? className : ""}
        `}
    >
      {children}
    </button>
  );
};

export default Button;
