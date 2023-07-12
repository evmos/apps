import { ButtonCopilot } from "./ButtonCopilot";
import { useStep } from "./useStep";
export const ActionsMetaMask = ({
  step,
  index,
  length,
  statusButton,
  setGroupState,
}: {
  step: any;
  index: number;
  length: number;
  statusButton: string;
  setGroupState: any;
}) => {
  const { text, status, textError, handleClick } = useStep(step, setGroupState);

  const props = {
    id: step.id,
    name: text,
    index,
    stepsLength: length,
    status,
    handleClick: handleClick,
    textError,
    statusButton,
  };

  return <ButtonCopilot props={props} />;
};
