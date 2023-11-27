import { useEffect, useState } from "react";

export default function useStrideData() {

    const [strideYield, setStrideYield] = useState(0)
    const [redemptionRate, setRedemptionRate] = useState(0)

    useEffect(() => {
        fetch('https://edge.stride.zone/api/stake-stats').then(async (res) => {
            const data = await res.json()
            const { stats } = data
            const evmosData = stats.find((stat: { denom: string, strideYield: number }) => stat.denom === "EVMOS")
            console.log("evmosData", evmosData)
            setStrideYield(evmosData.strideYield)
        })
    }, [])

    useEffect(() => {
        fetch('https://stride-api.polkachu.com/Stride-Labs/stride/stakeibc/host_zone/evmos_9001-2').then(async (res) => {
            const data = await res.json()
            const { host_zone } = data
            const redemption_rate = host_zone.redemption_rate
            setRedemptionRate(redemption_rate)
        })
    }, [])

    console.log("hoooks", strideYield, redemptionRate, "end")

    return { strideYield, redemptionRate }

}