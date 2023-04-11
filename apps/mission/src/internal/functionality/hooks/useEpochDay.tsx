import { useQuery } from "@tanstack/react-query";
import { EpochsResponse, getEpochs } from "../../fetch";

export const useEpochDay = () => {
  const epochs = useQuery<EpochsResponse, Error>({
    queryKey: ["epochs"],
    queryFn: () => getEpochs(),
  });

  const epoch = epochs?.data?.epochs?.filter(
    (e: { identifier: string }) => e.identifier === "day"
  );

  let convertedEpochStart = 0;
  if (epoch?.length === 1) {
    convertedEpochStart = Date.parse(epoch[0].current_epoch_start_time);
  }

  return { epochs: convertedEpochStart };
};
