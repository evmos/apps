export type TotalStakedResponse = {
  value: string;
};

export type Epochs = {
  current_epoch: string;
  current_epoch_start_height: string;
  current_epoch_start_time: string;
  duration: string;
  epoch_counting_started: boolean;
  identifier: string;
  start_time: string;
};

export type EpochsResponse = {
  epochs: Epochs[];
  pagination: {
    next_key: string | null;
    total: string;
  };
};

export type RemainingEpochsResponse = {
  remainingEpochs: number;
};
