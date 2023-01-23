import { useDispatch } from "react-redux";
import ExclamationIcon from "./icons/ExclamationIcon";
import SuccessIcon from "./icons/SuccessIcon";
import TriangleHazardIcon from "./icons/TriangleHazardIcon";
import { removeSnackbar } from "./redux/notificationSlice";

const Snackbar = ({
  type,
  content,
  id,
}: {
  type: string;
  content: JSX.Element | string;
  id: number;
}) => {
  const dispatch = useDispatch();

  let icon;
  if (type === "default") {
    icon = <ExclamationIcon />;
  } else if (type === "error") {
    icon = <TriangleHazardIcon color="white" />;
  } else if (type === "success") {
    icon = <SuccessIcon color="white" />;
  }

  return (
    <div
      onAnimationEnd={() => {
        // remove me from state
        dispatch(removeSnackbar({ id }));
      }}
      className="relative animation z-[9999]"
      key={id}
    >
      <div
        className={`
        ${type === "success" ? "text-white bg-green" : ""}
        ${type === "error" ? "text-white bg-red" : ""}
        ${type === "default" ? "bg-darkPearl text-darkGray2" : ""}
        inline-flex  p-2  max-w-[360px] overflow-hidden rounded-lg shadow-[0px 4px 8px rgba(0, 0, 0, 0.5)] pointer-events-auto break-all`}
      >
        <div className="space-x-2 flex-auto p-2 self-center w-full">
          <div className="flex font-bold items-center w-full">
            <div className="pr-3">{icon}</div>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Snackbar;
