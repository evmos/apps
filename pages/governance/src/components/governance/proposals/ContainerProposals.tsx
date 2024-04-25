// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { TrackerEvent } from "@evmosapps/ui-helpers";
import ProposalCard from "./ProposalCard";
import { CLICK_GOVERNANCE_PROPOSAL } from "tracker";
import { Link } from "@evmosapps/i18n/client";
import { useAccount } from "wagmi";
import { getActiveProviderKey } from "@evmosapps/evmos-wallet";
import { useProposals } from "../../../utils/hooks/useProposals";
import { createSlug} from "helpers/src/schemas/utils/createSlug";

export const ContainerProposals = ({ }) => {
  const { address } = useAccount();
  const activeProviderKey = getActiveProviderKey();
  const { data } = useProposals();

  return (
    <section className="grid grid-flow-row grid-cols-1 gap-4 px-4 md:px-0 lg:grid-cols-2">
      {data.map((proposal) => (
        <TrackerEvent
          key={proposal.id}
          event={CLICK_GOVERNANCE_PROPOSAL}
          properties={{
            "User Wallet Address": address,
            "Wallet Provider": activeProviderKey,
            "Governance Proposal": proposal.id,
          }}
        >
          <Link
            href={`/governance/${`${proposal.id}-${createSlug(
              proposal.title,
            )}`}`}
            data-testid="proposal"
          >
            <ProposalCard {...proposal} />
          </Link>
        </TrackerEvent>
      ))}
    </section>
  );
};
