import { useQuery } from "@tanstack/react-query";
import { RemainingEpochsResponse, getRemainingEpochs } from "../../fetch";

export const useRemainingEpochs = () => {
  const remainingEpochs = useQuery<RemainingEpochsResponse, Error>({
    queryKey: ["remainingEpochs"],
    queryFn: () => getRemainingEpochs(),
  });
  return {
    remainingEpochs: remainingEpochs?.data?.remainingEpochs ?? 0,
  };
};
