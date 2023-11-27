"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
    BasicModal,
    Button,
    Stack,
    Text,
    Box,
    BoxProps,
    Icon,
    LiquidStaking,
    LiquidStakingProps,
    useTheme,
} from '@interchain-ui/react';



import {
    RiCloseFill,
    RiTimeLine,
    RiArrowUpSLine,
    RiArrowDownSLine,
} from 'react-icons/ri';
import { useAssets } from "@evmosapps/evmos-wallet";

import { useEffect, useState } from 'react';
import useStrideData from './Stride/useStrideData';



const Stride = () => {
    const { theme, themeClass, setTheme } = useTheme(); function handleSubmit(a, b, c) {
        console.log("on submit", a, b, c)
    }

    const { evmosPrice, totalEvmosAsset } = useAssets()

    const { redemptionRate, strideYield } = useStrideData()

    console.log("evmosPrice", evmosPrice, redemptionRate, strideYield, totalEvmosAsset)

    useEffect(() => {
        setTheme("light")
    })



    const [reward, setReward] = useState<LiquidStakingProps['reward']>(

        {
            imgSrc: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stevmos.png',
            name: 'Staked Evmos',
            priceDisplayAmount: 2.31,
            rewardAmount: 0,
            symbol: 'stEvmos'
        }

    );

    const [stakedAmount, setStakedAmount] = useState<number>(0);

    return <div id="" className={`${themeClass} max-w-sm`}>



        <LiquidStaking
            stakeAmount={0}
            options={[
                {
                    available: 0,
                    imgSrc: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/evmos/images/evmos.png',
                    name: 'Evmos',
                    priceDisplayAmount: 0.33,
                    symbol: 'EVMOS'
                }
            ]}
            precision={2}
            reward={reward}
            stakeToken={{
                available: 0,
                imgSrc: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/evmos/images/evmos.png',
                name: 'Evmos',
                priceDisplayAmount: 0.33,
                symbol: 'EVMOS'
            }}
            bottomLink={{
                href: 'https://cosmology.tech/',
                label: 'Learn more',
            }}
            // Not required if you use custom renderSubmitButton prop
            timeEstimateLabel="30 seconds"
            descriptionList={[
                {
                    title: 'Rewards',
                    subtitle: '19.42%',
                    desc: 'Rewards on Stride are similar to native staking rewards. However, they accumulate in the background, which reflects in the price of the stToken continually appreciating compared to the native token, while you can still move the stToken around the ecosystem freely.',
                },
                {
                    title: 'Fees',
                    subtitle: 'Low',
                    desc: 'Strides 10% fee is only applied to rewards you earn. The tokens you stake (aka principal) and transactions are fee-free!',
                },
                {
                    title: 'Unbonding',
                    subtitle: '21-24 days',
                    desc: "Unstaking on Stride requires an unbonding period before you can withdraw your tokens. If you don't want to wait, you can sell stATOM directly on an exchange.",
                },
                {
                    title: 'Value of 1 stATOM',
                    subtitle: '1.204 ATOM',
                    desc: 'The value of 1 stATOM if redeemed through the Stride protocol redemption rate grows predictably as staking rewards accrue.',
                },
                {
                    title: 'Total Value Locked',
                    subtitle: '$24.7m',
                    desc: 'The total value of ATOM locked on Stride.',
                },
            ]}
            onChange={({
                stakeToken: payloadToken,
                stakeAmount: payloadStakedAmount,
            }) => {
                console.log("on change 1", payloadToken, payloadStakedAmount)
            }}
            footerLabel={
                <Stack
                    direction="horizontal"
                    space="$4"
                    attributes={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text fontWeight="$normal" fontSize="$sm" color="#A7B4C2">
                        Powered by
                    </Text>
                    <Box
                        as="img"
                        height="$8"
                        width="auto"
                        attributes={{
                            src: "/ecosystem/stride-logo.png",
                            alt: 'Stride',
                        }}
                    />
                </Stack>
            }
            renderAccordionButton={({ onClick, expanded }) => (
                <Button
                    size="sm"
                    intent={expanded ? 'tertiary' : 'secondary'}
                    onClick={onClick}
                >
                    {expanded ? (
                        <RiArrowUpSLine color="inherit" size="14px" />
                    ) : (
                        <RiArrowDownSLine color="inherit" size="14px" />
                    )}
                </Button>
            )}
            renderSubmitButton={() => (
                <Button
                    onClick={(event) => {
                        handleSubmit();
                    }}
                    intent="tertiary"
                    size="lg"
                    attributes={{ width: '$full' }}
                >
                    <Box as="span" mr="$2">
                        Stake
                    </Box>

                    <Box mr="$4">
                        <RiTimeLine color="inherit" />
                    </Box>

                    <Text
                        fontSize="$sm"
                        fontWeight="$normal"
                        as="span"
                        color="inherit"
                    >
                        ≈ &nbsp; 30 seconds
                    </Text>
                </Button>
            )}
            onSubmit={handleSubmit}
        />



    </div>
}

export default Stride
