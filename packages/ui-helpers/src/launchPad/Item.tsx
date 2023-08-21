import { LaunchPadItemsProps } from "./data";
import { CLICK_ON_DAPP_INSIDE_LAUNCHER, useTracker } from "tracker";

export const Item = ({ itemProps }: { itemProps: LaunchPadItemsProps }) => {
  const { handlePreClickAction } = useTracker(CLICK_ON_DAPP_INSIDE_LAUNCHER);

  const handleOnClick = () => {
    handlePreClickAction({ dApp: itemProps.text });
  };
  return (
    <a
      onClick={handleOnClick}
      href={itemProps.href}
      rel="noopener noreferrer"
      className="text-pearl flex flex-col items-center"
    >
      <div className="bg-red hover:bg-red1 active:bg-red2 flex w-fit items-center justify-center rounded-lg p-2 transition-all duration-150 ease-in hover:scale-105">
        {itemProps.icon}
      </div>
      <p className="text-sm">{itemProps.text}</p>
    </a>
  );
};
