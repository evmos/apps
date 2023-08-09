import { useContext } from "react";
import { StepsContext } from "../container/StepsContext";
import { Button } from "./Button";

export const TopUpDapp = ({ status }: { status: string }) => {
  const { setShowModal } = useContext(StepsContext);
  return (
    <Button
      text="Top up account"
      onClick={() => {
        setShowModal(true);
      }}
      status={status}
    />
  );
};
