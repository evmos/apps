import { ButtonCopilot } from "./ButtonCopilot";
import { useStep } from "./useStep";
export const ConnectMetamask = ({
  step,
  index,
  length,
}: {
  step: any;
  index: number;
  length: number;
}) => {
  const { text, status, disable, textError, handleClick } = useStep(step);

  const props = {
    id: step.id,
    name: text,
    index,
    stepsLength: length,
    status,
    handleClick: handleClick,
    disabled: disable,
    textError,
  };

  return <ButtonCopilot props={props} />;
};
