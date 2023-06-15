import { ConfirmButton, ModalTitle } from "ui-helpers";
import { ItemModal } from "./ItemModal";
import { ExclamationIcon } from "icons";
const dummyProps = {
  // eslint-disable-next-line no-secrets/no-secrets
  address: "evmosc5ljcjw341ls6f7xpfvakm2amg962y84z3kell8ks",
  totalTokens: "1,000,000",
  availableClawback: "944,444",
};
// TODO: format totalTokens and availableClawback depending on the response
export const ClawbackModal = () => {
  const handleOnClick = () => {
    // TODO: logic for clawback
  };

  return (
    <div className="space-y-5">
      <ModalTitle title="Clawback Tokens" />
      <div className=" rounded border-2 border-darkGray2 p-4">
        Clawback retrieves all unvested tokens from a vesting account.
      </div>
      <ItemModal title="Account Address" description={dummyProps.address} />
      <ItemModal
        title="Total Vesting Tokens"
        description={`${dummyProps.totalTokens} EVMOS `}
      />
      <ItemModal
        title="Available for Clawback"
        description={`${dummyProps.availableClawback} EVMOS `}
      />
      <div>
        <div className="flex items-center space-x-1 ">
          <ExclamationIcon className="text-red" />
          <span className="text-lg font-bold">CAUTION</span>
        </div>
        Clawback cannot be undone! Please make sure you want to do this action.
      </div>

      <ConfirmButton text="Clawback" onClick={handleOnClick} />
    </div>
  );
};
