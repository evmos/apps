import { useState } from "react";
import CloseIcon from "../common/images/icons/CloseIcon";
import ExclamationIcon from "./icons/ExclamationIcon";
import SuccessIcon from "./icons/SuccessIcon";
import TriangleHazardIcon from "./icons/TriangleHazardIcon";
import { useSnackbarContext } from "./SnackbarContext";

const Snackbar = ({
  type,
  text,
  subtext,
  id,
}: {
  type: string;
  text: string;
  subtext: string;
  id: number;
}) => {
  const [isDisplayed, setIsDisplayed] = useState(true);
  const { value, setValue } = useSnackbarContext();
  let icon;
  if (type === "default") {
    icon = <ExclamationIcon />;
  } else if (type === "error") {
    icon = <TriangleHazardIcon color="white" />;
  } else if (type === "success") {
    icon = <SuccessIcon color="white" />;
  }
  const subTextStyling =
    subtext && type !== "default" ? "text-white" : "text-darkGray3";

  return (
    <div
      // TODO: delete the correct snackbar
      onAnimationEnd={() => {
        if (value.length === 1) {
          setValue(value);
        } else {
          setValue(value.splice(id, 1));
        }
      }}
      className={`${!isDisplayed ? "hidden" : ""} relative animation`}
    >
      <div
        className={`
        ${type === "success" ? "text-white bg-green" : ""} 
        ${type === "error" ? "text-white bg-red" : ""} 
        ${type === "default" ? "bg-darkPearl text-darkGray2" : ""}
        inline-flex relative p-2 min-w-[280px] max-w-[360px] overflow-hidden rounded-lg shadow-[0px 4px 8px rgba(0, 0, 0, 0.5)] pointer-events-auto`}
      >
        <div className="space-x-2 flex-auto p-2 self-center w-full">
          <div className="flex font-bold items-center w-full">
            <div className="pr-3">{icon}</div>
            <div>
              <div className="">{text}</div>
              <div className={`${subTextStyling} text-sm`}>{subtext}</div>
            </div>
          </div>
        </div>
      </div>
      <CloseIcon
        className={`
        ${
          type !== "default" ? "text-white" : "text-darkGray3"
        } absolute top-3 right-3 px-2 py-1 w-10 h-9 cursor-pointer rounded-md flex-auto hover:bg-transparent transition-all duration-200 ease-in-out`}
        width={20}
        height={20}
        onClick={() => {
          setIsDisplayed(false);
        }}
      />
    </div>
  );
};

export default Snackbar;
