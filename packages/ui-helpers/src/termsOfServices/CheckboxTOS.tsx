import { useState } from "react";

const CheckboxTOS = ({
  label,
  disabled,
}: // setShowIubenda,
{
  label: string | JSX.Element;
  disabled?: boolean;
  // setShowIubenda?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [acknowledgeTOS, setAcknowledgeTOS] = useState(false);

  const handleDivClick = () => {
    setAcknowledgeTOS(!acknowledgeTOS);
    // setShowIubenda !== undefined && setShowIubenda(true);
    // const divs = document.querySelectorAll("#iubenda-cs-banner");
    // if (divs !== null) {
    //   divs.forEach((div) => {
    //     const element = div as HTMLElement;
    //     element.style.visibility = "hidden"; // Apply the desired style here
    //   });

    // consentModal.style.visibility = "visible";
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
