import { useState } from "react";

const CheckboxTOS = ({
  label,
  disabled,
}: {
  label: string | JSX.Element;
  disabled?: boolean;
}) => {
  const [acknowledgeTOS, setAcknowledgeTOS] = useState(false);

  const handleDivClick = () => {
    setAcknowledgeTOS(!acknowledgeTOS);
  };

  const handleCheckboxChange = () => {
    // Do nothing here
    // avoid error: Unexpected empty arrow function
  };
  return (
    <div
      className={`flex items-center space-x-2 ${
        disabled ? "pointer-events-none" : "pointer-events-default"
      }`}
      onClick={handleDivClick}
    >
      <input
        type="checkbox"
        onChange={handleCheckboxChange}
        checked={acknowledgeTOS}
      />
      <label>{label}</label>
    </div>
  );
};

export default CheckboxTOS;
