const CheckboxTOS = ({
  label,
  disabled,

  action,
  onClick,
}: {
  label: string | JSX.Element;
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;

  action: boolean;
}) => {
  const handleCheckboxChange = () => {
    // Do nothing here
    // avoid error: Unexpected empty arrow function
  };
  return (
    <div
      className={`flex items-center space-x-2 ${
        disabled ? "pointer-events-none" : "pointer-events-default"
      }`}
      onClick={onClick}
    >
      <input type="checkbox" onChange={handleCheckboxChange} checked={action} />
      <label>{label}</label>
    </div>
  );
};

export default CheckboxTOS;
