// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getPercentage, raise } from "helpers";

import { useEvmosChainRef } from "@evmosapps/evmos-wallet/src/registry-actions/hooks/use-evmos-chain-ref";
import { cosmos } from "helpers/src/clients/cosmos";
import get from "lodash-es/get";
import { formatUnits } from "@evmosapps/evmos-wallet/src/registry-actions/utils";
import { safeBigInt } from "helpers/src/bigint/safe-bigint";
import { fetcEvmosBlockedProposals } from "./fetchBlockedProposals";

const fetchProposalTally = async ({
  chainRef,
  proposalId,
}: {
  chainRef: string;
  proposalId: string;
}) =>
  cosmos(chainRef).GET("/cosmos/gov/v1/proposals/{proposal_id}/tally", {
    params: {
      path: {
        proposal_id: proposalId,
      },
    },
  });
const ProposalsQueryOptions = (chainRef: string) =>
  queryOptions({
    queryKey: ["proposals", chainRef],

    queryFn: async () => {
      let [blockedProposals, proposals] = await Promise.all([
        await fetcEvmosBlockedProposals(),
        cosmos(chainRef)
          .GET("/cosmos/gov/v1/proposals", {
            params: {
              query: {
                "pagination.limit": "50",
                "pagination.reverse": true,
              },
            },
          })
          .then(({ data = {} }) => data.proposals ?? []),
      ]);

      proposals = proposals.filter(({ id, status }) => {
        const isBlocked = id && blockedProposals.includes(id);
        const isDepositPeriod = status === "PROPOSAL_STATUS_DEPOSIT_PERIOD";
        return !isBlocked && !isDepositPeriod;
      });

      return await Promise.all(
        proposals.map(
          async ({
            id,
            title,
            summary,
            messages,
            status,
            final_tally_result,
            voting_start_time,
            voting_end_time,
            deposit_end_time = "",
            total_deposit,
            submit_time = "",
          }) => {
            if (!id || !status || !voting_start_time || !voting_end_time)
              return [];
            let tally = final_tally_result;
            if (status === "PROPOSAL_STATUS_VOTING_PERIOD") {
              const { data } = await fetchProposalTally({
                chainRef,
                proposalId: id,
              });
              tally = data?.tally ?? tally;
            }
            return [
              {
                id,
                title:
                  title || get(messages, "0.content.title") || `Proposal ${id}`,

                description:
                  summary || get(messages, "0.content.description") || "",

                status,
                tally: getPercentage({
                  yes: tally?.yes_count ?? "0",
                  no: tally?.no_count ?? "0",
                  abstain: tally?.abstain_count ?? "0",
                  noWithVeto: tally?.no_with_veto_count ?? "0",
                }),
                tallyAbsolute: {
                  yes: safeBigInt(tally?.yes_count ?? "0"),
                  no: safeBigInt(tally?.no_count ?? "0"),
                  abstain: safeBigInt(tally?.abstain_count ?? "0"),
                  noWithVeto: safeBigInt(tally?.no_with_veto_count ?? "0"),
                },
                votingStart: new Date(voting_start_time),
                votingEnd: new Date(voting_end_time),
                depositEnd: new Date(deposit_end_time),
                submitTime: new Date(submit_time),
                totalVotes: Object.values(tally ?? {}).reduce(
                  (acc, curr) => acc + safeBigInt(curr),
                  0n,
                ),
                totalDeposit: formatUnits(
                  safeBigInt(total_deposit?.[0]?.amount ?? "0"),
                  18,
                ),
                type: get(messages, "0.content.@type") ?? "",
              },
            ];
          },
        ),
      ).then((data) => data.flat());
    },
  });

type InferQueryFnData<T> = T extends { queryFn?: (...args: any[]) => infer R }
  ? Awaited<R>
  : T extends (...args: any[]) => infer Q
    ? InferQueryFnData<Q>
    : never;

export type ProposalsQueryResponse = InferQueryFnData<
  typeof ProposalsQueryOptions
>;

export const useProposals = () => {
  const chainRef = useEvmosChainRef();
  return useSuspenseQuery(ProposalsQueryOptions(chainRef));
};

export const useProposalById = (proposalId: string) => {
  const chainRef = useEvmosChainRef();
  return useSuspenseQuery({
    ...ProposalsQueryOptions(chainRef),
    select: (data) =>
      data.find(({ id }) => id === proposalId) ?? raise("Proposal not found"),
  });
};
