import { useQuery } from "@tanstack/react-query";
import { BigNumber } from "ethers";
import { useMemo } from "react";
import { convertAndFormat } from "../../../asset/style/format";
import {
  formatDate,
  getPercentage,
  splitString,
  SumBigNumber,
} from "../../../common/helpers/style";
import { BIG_ZERO } from "../../../common/math/Bignumbers";

import { getProposals, getTallying } from "../fetch";
import { ProposalDetailProps, ProposalProps, TallyingProps } from "../types";

export const useProposals = (pid: string) => {
  const proposalsResponse = useQuery({
    queryKey: ["proposals"],
    queryFn: () => getProposals(),
  });

  const tallyingResponse = useQuery({
    queryKey: ["tallying"],
    queryFn: () => getTallying(),
  });

  const proposals = useMemo(() => {
    const temp: ProposalProps[] = [];
    if (proposalsResponse.data !== undefined) {
      proposalsResponse.data.map((item) => {
        const percents = getPercentage([
          item.final_tally_result.yes_count,
          item.final_tally_result.no_count,
          item.final_tally_result.abstain_count,
          item.final_tally_result.no_with_veto_count,
        ]);
        temp.push({
          id: item.id,
          title: item.messages[0].content.title,
          status: item.status,
          votingStartTime: formatDate(item.voting_start_time),
          votingEndTime: formatDate(item.voting_end_time),
          // Order for tallyResults:  yes, no, abstain, no_with_veto
          tallyResults: [
            String(percents[0]),
            String(percents[1]),
            String(percents[2]),
            String(percents[3]),
          ],
        });
      });
    }
    return temp;
  }, [proposalsResponse]);

  const proposalDetail = useMemo(() => {
    let temp: ProposalDetailProps = {
      id: "--",
      title: "--",
      status: "--",
      votingStartTime: "--",
      votingEndTime: "--",
      // Order for tallyResults:  yes, no, abstain, no_with_veto
      tallyResults: ["0", "0", "0", "0"],
      tallyPercents: [0, 0, 0, 0],
      tallying: { quorum: "--", threshold: "--", vetoThreshold: "--" },
      type: "--",
      totalDeposit: "--",
      submitTime: "--",
      depositEndTime: "--",
      description: "",
      total: BIG_ZERO,
    };
    if (proposalsResponse.data !== undefined) {
      const filtered = proposalsResponse.data.filter(
        (proposal) => proposal.id === pid
      );
      // TODO: handle if pid is invalid or we have it
      // as undefined or null.
      // let temp: ProposalDetailProps;
      if (filtered.length === 0) {
        return temp;
      }
      const proposalFiltered = filtered[0];
      const percents = getPercentage([
        proposalFiltered.final_tally_result.yes_count,
        proposalFiltered.final_tally_result.no_count,
        proposalFiltered.final_tally_result.abstain_count,
        proposalFiltered.final_tally_result.no_with_veto_count,
      ]);

      let tallyingData: TallyingProps = {
        quorum: "",
        threshold: "",
        vetoThreshold: "",
      };
      if (tallyingResponse.data !== undefined) {
        tallyingData = {
          quorum: (
            Number(tallyingResponse.data.tally_params.quorum) * 100
          ).toFixed(2),
          threshold: (
            Number(tallyingResponse.data.tally_params.threshold) * 100
          ).toFixed(2),
          vetoThreshold: (
            Number(tallyingResponse.data.tally_params.veto_threshold) * 100
          ).toFixed(2),
        };
      }

      temp = {
        id: proposalFiltered.id,
        title: proposalFiltered.messages[0].content.title,
        status: proposalFiltered.status,
        votingStartTime: formatDate(proposalFiltered.voting_start_time),
        votingEndTime: formatDate(proposalFiltered.voting_end_time),
        // Order for tallyResults:  yes, no, abstain, no_with_veto
        tallyPercents: [percents[0], percents[1], percents[2], percents[3]],
        tallyResults: [
          proposalFiltered.final_tally_result.yes_count,
          proposalFiltered.final_tally_result.no_count,
          proposalFiltered.final_tally_result.abstain_count,
          proposalFiltered.final_tally_result.no_with_veto_count,
        ],
        tallying: tallyingData,
        type: splitString(proposalFiltered.messages[0].content["@type"]),
        totalDeposit: convertAndFormat(
          BigNumber.from(proposalFiltered.total_deposit[0].amount)
        ),
        submitTime: formatDate(proposalFiltered.submit_time),
        depositEndTime: formatDate(proposalFiltered.deposit_end_time),
        description: proposalFiltered.messages[0].content.description.replace(
          /\\[rn]/g,
          "\n"
        ),
        total: SumBigNumber([
          proposalFiltered.final_tally_result.yes_count,
          proposalFiltered.final_tally_result.no_count,
          proposalFiltered.final_tally_result.abstain_count,
          proposalFiltered.final_tally_result.no_with_veto_count,
        ]),
      };
    }
    return temp;
  }, [proposalsResponse, pid, tallyingResponse]);

  return {
    proposals,
    proposalDetail,
    loading: proposalsResponse.isLoading,
    error: proposalsResponse.error,
  };
};
