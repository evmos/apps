// import { useDispatch } from "react-redux";
import { UndelegateProps } from "../types";

export const useUndelegation = (useUndelegateProps: UndelegateProps) => {
  //   const dispatch = useDispatch();

  //   async
  const handleConfirmButton = () => {
    useUndelegateProps.setConfirmClicked(true);
    // TODO: call undelegate endpoint
  };

  return { handleConfirmButton };
};
