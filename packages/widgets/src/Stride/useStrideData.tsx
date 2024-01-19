// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useEffect, useState } from "react";

type StrideStakeStatsResponse = {
  stats: [
    {
      denom: string;
      strideYield: number;
    },
  ];
};

type StrideHostZoneResponse = {
  host_zone: {
    redemption_rate: string;
  };
};

export default function useStrideData() {
  const [strideYield, setStrideYield] = useState(0);
  const [redemptionRate, setRedemptionRate] = useState(0);

  useEffect(() => {
    fetch("https://edge.stride.zone/api/stake-stats")
      .then(async (res) => {
        const data = (await res.json()) as StrideStakeStatsResponse;
        const { stats } = data;
        const evmosData = stats.find(
          (stat: { denom: string; strideYield: number }) =>
            stat.denom === "EVMOS",
        );
        setStrideYield(evmosData?.strideYield ?? 0);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch(
      "https://stride-api.polkachu.com/Stride-Labs/stride/stakeibc/host_zone/evmos_9001-2",
    )
      .then(async (res) => {
        const data = (await res.json()) as StrideHostZoneResponse;
        const { host_zone } = data;
        const redemption_rate = host_zone.redemption_rate;
        setRedemptionRate(parseFloat(redemption_rate));
      })
      .catch(() => {});
  }, []);

  return { strideYield, redemptionRate };
}
