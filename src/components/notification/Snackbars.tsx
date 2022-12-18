import { useSelector } from "react-redux";
import { StoreType } from "../../redux/Store";
import { getAllSnackbars } from "./redux/notificationSlice";
import Snackbar from "./Snackbar";

export default function Snackbars() {
  const valueRedux = useSelector((state: StoreType) => getAllSnackbars(state));

  return (
    <div className="">
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
