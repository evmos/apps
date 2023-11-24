// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  PROPOSAL_STATUS,
  PROPOSAL_STATUS_PASSED,
  PROPOSAL_STATUS_REJECTED,
} from "../../../utils/types";
import { CloseIcon, CheckIcon } from "icons";
const ProposalStatus = ({ status }: { status: string }) => {
  const style =
    "text-xs flex items-center space-x-2 px-4 py-2 rounded-3xl opacity-80";
  if (status === PROPOSAL_STATUS_REJECTED) {
    return (
      <div className={`${style} bg-black`}>
        <span>{<CloseIcon width={18} height={18} />}</span>
        <span>{PROPOSAL_STATUS.PROPOSAL_STATUS_REJECTED}</span>
      </div>
    );
  }
  if (status === PROPOSAL_STATUS_PASSED) {
    return (
      <div className={`${style} bg-green`}>
        <span>{<CheckIcon width={18} height={18} />}</span>
        <span>{PROPOSAL_STATUS.PROPOSAL_STATUS_PASSED}</span>
      </div>
    );
  }
  // default: PROPOSAL_STATUS_UNSPECIFIED, PROPOSAL_STATUS_DEPOSIT_PERIOD,
  //   PROPOSAL_STATUS_FAILED, PROPOSAL_STATUS_VOTING_PERIOD

  return (
    <div className={`${style} border-2 border-pearl`}>
      <span>{PROPOSAL_STATUS.PROPOSAL_STATUS_VOTING_PERIOD}</span>
    </div>
  );
};

export default ProposalStatus;
