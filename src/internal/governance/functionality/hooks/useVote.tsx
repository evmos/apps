import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../../../../redux/Store";
import { getVoteRecord } from "../fetch";

export const useVote = (id: string) => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const voteResponse = useQuery({
    queryKey: ["vote", id, wallet.evmosAddressCosmosFormat],
    queryFn: () => getVoteRecord(id, wallet.evmosAddressCosmosFormat),
  });

  //   It could be undefined
  const vote = useMemo(() => {
    if (voteResponse.data !== undefined) {
      return voteResponse.data;
    }
  }, [voteResponse]);

  return {
    vote: vote,
    loading: voteResponse.isLoading,
    error: voteResponse.error,
  };
};
