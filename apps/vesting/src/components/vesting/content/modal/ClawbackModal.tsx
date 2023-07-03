import { ConfirmButton, ModalTitle } from "ui-helpers";
import { ItemModal } from "./ItemModal";
import { ExclamationIcon } from "icons";
import { VestingAccountDetail } from "../../../../internal/types";
import { convertFromAtto, formatNumber } from "helpers";

// TODO: format totalTokens and availableClawback depending on the response
export const ClawbackModal = ({
  vestingDetails,
}: {
  vestingDetails: VestingAccountDetail;
}) => {
  const handleOnClick = () => {
    // TODO: logic for clawback
  };

  const totalTokens = () => {
    return formatNumber(convertFromAtto(vestingDetails.unvestedAmount, 18), 6);
  };

  const availableClawback = () => {
    return formatNumber(
      convertFromAtto(vestingDetails.originalVestingAmount, 18),
      6
    );
  };
  return (
    <div className="space-y-5">
      <ModalTitle title="Clawback Tokens" />
      <div className=" rounded border-2 border-darkGray2 p-4">
        Clawback retrieves all unvested tokens from a vesting account.
      </div>
      <ItemModal
        title="Account Address"
        description={vestingDetails.accountAddress}
      />
      <ItemModal
        title="Total Vesting Tokens"
        description={`${totalTokens()} EVMOS `}
      />
      <ItemModal
        title="Available for Clawback"
        description={`${availableClawback()} EVMOS `}
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
