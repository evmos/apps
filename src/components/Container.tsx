import { useDispatch } from "react-redux";
import { addSnackbar } from "./notification/redux/notificationSlice";
import Snackbars from "./notification/Snackbars";

const Container = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-black grid min-h-screen grid-template-32">
      <div className='w-full h-full bg-[url("/stars.svg")] bg-repeat bg-auto bg-center px-14 font-[GreyCliff] overflow-auto'>
        {/* TODO: This is just a testing button, remove it and set the snackbars based on events */}
        <button
          onClick={() => {
            dispatch(
              addSnackbar({
                // Note: id can be any number, it gets overwritten by redux with the correct value
                // Using id here, to keep the Snackbar interface for the payload
                id: 0,
                type: "error",
                text: "Testing snackbar",
                subtext: "This is a subtext for the snackbar",
              })
            );
          }}
          className="bg-green"
        >
          Add snackbar
        </button>
        {children}
        <Snackbars />
      </div>
    </div>
  );
};

export default Container;
