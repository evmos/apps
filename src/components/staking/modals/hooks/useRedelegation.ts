// import { useDispatch } from "react-redux";
import { RedelegateProps } from "../types";

export const useRedelegation = (useRedelegateProps: RedelegateProps) => {
  //   const dispatch = useDispatch();

  //   async
  const handleConfirmButton = () => {
    useRedelegateProps.setConfirmClicked(true);

    useRedelegateProps.setDisabled(true);

    // TODO: call redelegate endpoint
  };

  return { handleConfirmButton };
};
