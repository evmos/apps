import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { StoreType } from "../../redux/Store";
import { getAllSnackbars } from "./redux/notificationSlice";

const Snackbar = dynamic(() => import("./Snackbar"));

export default function Snackbars() {
  const valueRedux = useSelector((state: StoreType) => getAllSnackbars(state));

  return (
    <div className="absolute left-3 bottom-3 space-y-5">
      {valueRedux.map((e) => {
        return (
          <Snackbar
            type={e.type}
            text={e.text}
            subtext={e.subtext}
            id={e.id}
            key={e.id}
          />
        );
      })}
    </div>
  );
}
