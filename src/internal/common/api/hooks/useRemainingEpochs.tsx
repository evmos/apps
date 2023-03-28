import { getRemainingEpochs, RemainingEpochsResponse } from "./fetch";
import { useQuery } from "@tanstack/react-query";

export const useRemainingEpochs = () => {
  const remainingEpochs = useQuery<RemainingEpochsResponse, Error>({
    queryKey: ["remainingEpochs"],
    queryFn: () => getRemainingEpochs(),
  });
  return {
    remainingEpochs: remainingEpochs?.data?.remainingEpochs ?? 0,
  };
};
