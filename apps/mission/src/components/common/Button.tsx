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
        font-[GreyCliff]" flex justify-center rounded border border-pearl p-2 text-xs font-bold uppercase text-pearl hover:bg-whiteOpacity ${
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
