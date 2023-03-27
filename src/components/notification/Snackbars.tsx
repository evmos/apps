import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { StoreType } from "../../redux/Store";
import { getAllSnackbars } from "./redux/notificationSlice";

const Snackbar = dynamic(() => import("./Snackbar"));

export default function Snackbars() {
  const valueRedux = useSelector((state: StoreType) => getAllSnackbars(state));

  return (
    <div className="fixed left-3 bottom-3 z-[100] space-y-5">
      {valueRedux.map((e) => {
        return (
          <Snackbar type={e.type} content={e.content} id={e.id} key={e.id} />
        );
      })}
    </div>
  );
}
