const ButtonWallet = ({
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
      className={`hover:bg-grayOpacity border border-darkPearl px-4 py-3 rounded capitalize ${
        disabled ? "disabled" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default ButtonWallet;
