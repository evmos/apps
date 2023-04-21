// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useQuery } from "@tanstack/react-query";

import { RemainingEpochsResponse, getRemainingEpochs } from "services";

export const useRemainingEpochs = () => {
  const remainingEpochs = useQuery<RemainingEpochsResponse, Error>({
    queryKey: ["remainingEpochs"],
    queryFn: () => getRemainingEpochs(),
  });
  return {
    remainingEpochs: remainingEpochs?.data?.remainingEpochs ?? 0,
  };
};
