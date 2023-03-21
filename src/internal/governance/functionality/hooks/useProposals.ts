import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { formatDate, getPercentage } from "../../../common/helpers/style";
import { getProposals } from "../fetch";
import { ProposalProps } from "../types";

export const useProposals = () => {
  const proposalsResponse = useQuery({
    queryKey: ["proposals"],
    queryFn: () => getProposals(),
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
          tallyResults: [percents[0], percents[1], percents[2], percents[3]],
        });
      });
    }
    return temp;
  }, [proposalsResponse]);

  return { proposals };
};
