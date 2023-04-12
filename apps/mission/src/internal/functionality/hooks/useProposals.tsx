import { useQuery } from "@tanstack/react-query";
import { BigNumber } from "ethers";
import { useMemo } from "react";

import { BIG_ZERO } from "../../common/math/Bignumbers";
import { getProposals } from "../../fetch";
import { ProposalDetailProps, ProposalProps } from "../../types";
import {
  formatAttoNumber,
  formatDate,
  getPercentage,
  isVotingTimeWithinRange,
  splitString,
  sumBigNumber,
} from "../../common/helpers/style";

export const useProposals = (pid?: string) => {
  const proposalsResponse = useQuery({
    queryKey: ["proposals"],
    queryFn: () => getProposals(),
  });

  const proposals = useMemo(() => {
    const temp: ProposalProps[] = [];
    if (proposalsResponse.data !== undefined) {
      proposalsResponse.data.proposals.map((item) => {
        const percents = getPercentage([
          item.final_tally_result.yes_count,
          item.final_tally_result.no_count,
          item.final_tally_result.abstain_count,
          item.final_tally_result.no_with_veto_count,
        ]);
        temp.push({
          id: item.id,
          title: item.messages.length > 0 ? item.messages[0].content.title : "",
          status: item.status,
          votingStartTime:
            item.voting_start_time !== ""
              ? formatDate(item.voting_start_time)
              : "",
          votingEndTime:
            item.voting_end_time !== "" ? formatDate(item.voting_end_time) : "",
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
      tallying: { quorum: "--", threshold: "--", veto_threshold: "--" },
      type: "--",
      totalDeposit: "--",
      submitTime: "--",
      depositEndTime: "--",
      description: "",
      total: BIG_ZERO,
      isVotingTimeWithinRange: false,
    };
    if (proposalsResponse.data !== undefined) {
      const filtered = proposalsResponse.data.proposals.filter(
        (proposal) => proposal.id === pid
      );
      if (filtered.length === 0) {
        return "Proposal not found, please try again";
      }
      const proposalFiltered = filtered[0];
      const percents = getPercentage([
        proposalFiltered.final_tally_result.yes_count,
        proposalFiltered.final_tally_result.no_count,
        proposalFiltered.final_tally_result.abstain_count,
        proposalFiltered.final_tally_result.no_with_veto_count,
      ]);

      const tallyingData = {
        quorum: (
          Number(proposalsResponse.data.tally_params.quorum) * 100
        ).toFixed(2),
        threshold: (
          Number(proposalsResponse.data.tally_params.threshold) * 100
        ).toFixed(2),
        veto_threshold: (
          Number(proposalsResponse.data.tally_params.veto_threshold) * 100
        ).toFixed(2),
      };

      temp = {
        id: proposalFiltered.id,
        title:
          proposalFiltered.messages.length > 0
            ? proposalFiltered.messages[0].content.title
            : "",
        status: proposalFiltered.status,
        votingStartTime:
          proposalFiltered.voting_start_time !== ""
            ? formatDate(proposalFiltered.voting_start_time)
            : "",
        votingEndTime:
          proposalFiltered.voting_end_time !== ""
            ? formatDate(proposalFiltered.voting_end_time)
            : "",

        // Order for tallyResults:  yes, no, abstain, no_with_veto
        tallyPercents: [percents[0], percents[1], percents[2], percents[3]],
        tallyResults: [
          proposalFiltered.final_tally_result.yes_count,
          proposalFiltered.final_tally_result.no_count,
          proposalFiltered.final_tally_result.abstain_count,
          proposalFiltered.final_tally_result.no_with_veto_count,
        ],
        tallying: tallyingData,
        type:
          proposalFiltered.messages.length > 0
            ? splitString(proposalFiltered.messages[0].content["@type"])
            : "",
        totalDeposit:
          proposalFiltered.total_deposit.length > 0
            ? formatAttoNumber(
                BigNumber.from(proposalFiltered.total_deposit[0].amount)
              )
            : "--",
        submitTime:
          proposalFiltered.submit_time !== ""
            ? formatDate(proposalFiltered.submit_time)
            : "",
        depositEndTime:
          proposalFiltered.deposit_end_time !== ""
            ? formatDate(proposalFiltered.deposit_end_time)
            : "",
        description:
          proposalFiltered.messages.length > 0
            ? proposalFiltered.messages[0].content.description?.replace(
                /\\[rn]/g,
                "\n"
              )
            : "",
        total: sumBigNumber([
          proposalFiltered.final_tally_result.yes_count,
          proposalFiltered.final_tally_result.no_count,
          proposalFiltered.final_tally_result.abstain_count,
          proposalFiltered.final_tally_result.no_with_veto_count,
        ]),
        isVotingTimeWithinRange: isVotingTimeWithinRange(
          proposalFiltered.voting_end_time
        ),
      };
    }
    return temp;
  }, [proposalsResponse, pid]);

  return {
    proposals,
    proposalDetail,
    loading: proposalsResponse.isLoading,
    error: proposalsResponse.error,
  };
};
