// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import {
  Button,
  Stack,
  Text,
  Box,
  LiquidStaking,
  LiquidStakingProps,
  useTheme,
} from "@interchain-ui/react";
import "@interchain-ui/react/styles";
import { ThemeProvider } from "@interchain-ui/react";

import { RiTimeLine, RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { UpRightArrowIcon } from "@evmosapps/icons/UpRightArrowIcon";

import { useEffect, useState } from "react";
import useStrideData from "./useStrideData";
import { useStridePrecompile } from "./useStridePrecompile";
import { formatUnits, parseUnits } from "viem";
import Link from "next/link";
import { EXPLORER_URL } from "constants-helper";
import { useEvmosData } from "./query-evmos-values";

const StrideWidget = () => {
  const { themeClass, setTheme } = useTheme();

  const { balance, evmosPrice } = useEvmosData();
  const { redemptionRate, strideYield } = useStrideData();
  const [evmosOption, setEvmosOption] = useState({
    available: 0,
    imgSrc:
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/evmos/images/evmos.png",
    name: "Evmos",
    priceDisplayAmount: 0,
    symbol: "EVMOS",
  });
  const [showBalanceLink, setShowBalanceLink] = useState(false);
  const [stakedAmount, setStakedAmount] = useState<number>(0);

  const {
    liquidStake,
    data: transactionHash,
    isPending: loadingLiquidStake,
    reset: resetLiquidStake,
    errorMessage: liquidStakeError,
  } = useStridePrecompile();

  function handleLiquidStake() {
    try {
      liquidStake({
        amount: parseUnits(stakedAmount.toString(), 18).toString(),
      });
      setShowBalanceLink(true);
    } catch (e) {}
  }

  useEffect(() => {
    setTheme("light");
  });

  useEffect(() => {
    setEvmosOption((prev) => {
      return {
        ...prev,
        available: balance
          ? parseFloat(formatUnits(BigInt(balance ?? "0"), 18))
          : 0,
        priceDisplayAmount:
          parseFloat(evmosPrice === "--" ? "0" : evmosPrice) * (stakedAmount) ?? 0,
      };
    });
  }, [balance, evmosPrice, stakedAmount]);

  const [reward, setReward] = useState<LiquidStakingProps["reward"]>({
    imgSrc:
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stevmos.png",
    name: "Staked Evmos",
    priceDisplayAmount: 0,
    rewardAmount: 0,
    symbol: "stEVMOS",
  });

  return (
    <div id="" className={`${themeClass}`}>
      <LiquidStaking
        stakeAmount={stakedAmount}
        precision={2}
        reward={reward}
        stakeToken={evmosOption}
        bottomLink={{
          href: "https://cosmology.tech/",
          label: "Learn more",
        }}
        // Not required if you use custom renderSubmitButton prop
        timeEstimateLabel="30 seconds"
        descriptionList={[
          {
            title: "Rewards",
            subtitle: `${(strideYield * 100).toFixed(2)}%`,
            desc: "Rewards on Stride are similar to native staking rewards. However, they accumulate in the background, which reflects in the price of the stToken continually appreciating compared to the native token, while you can still move the stToken around the ecosystem freely.",
          },
          {
            title: "Fees",
            subtitle: "Low",
            desc: "Strides 10% fee is only applied to rewards you earn. The tokens you stake (aka principal) and transactions are fee-free!",
          },
          {
            title: "Unbonding",
            subtitle: "14-17 days",
            desc: "Unstaking on Stride requires an unbonding period before you can withdraw your tokens. If you don't want to wait, you can sell stEVMOS directly on an exchange.",
          },
          {
            title: "Value of 1 stEVMOS",
            subtitle: `${
              redemptionRate ? redemptionRate?.toFixed(2) : 0
            } EVMOS`,
            desc: "The value of 1 stEVMOS if redeemed through the Stride protocol redemption rate grows predictably as staking rewards accrue.",
          },
        ]}
        onChange={(payloadStakedAmount) => {
          setShowBalanceLink(false);
          resetLiquidStake();
          if (isNaN(payloadStakedAmount)) {
            setStakedAmount(0);
            setReward((prevReward) => {
              return {
                ...prevReward,
                rewardAmount: 0,
                priceDisplayAmount: 0,
              };
            });
            return;
          }
          setStakedAmount(payloadStakedAmount);
          setReward((prevReward) => {
            const ra = payloadStakedAmount / redemptionRate;
            const pda = parseFloat(evmosPrice ?? 0) * redemptionRate;
            return {
              ...prevReward,
              rewardAmount: ra,
              priceDisplayAmount: ra * pda,
            };
          });
        }}
        footerLabel={
          <Stack
            direction="horizontal"
            space="$4"
            attributes={{
              justifyContent: "center",
              alignItems: "center",
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
                alt: "Stride",
              }}
            />
          </Stack>
        }
        renderAccordionButton={({
          onClick,
          expanded,
        }: {
          onClick: () => void;
          expanded: boolean;
        }) => (
          <Button
            size="sm"
            intent={expanded ? "tertiary" : "secondary"}
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
          <div className="flex flex-col gap-3">
            {transactionHash && (
              <div
                style={{ height: "50px" }}
                className={`text-sm text-black border-2 border-[#262B30] items-center flex-col justify-center relative overflow-hidden rounded-lg  px-4 transition-all duration-300 ease-inOutBack md:px-3 flex py-[10px]`}
              >
                <span className="">Transaction Submitted</span>
                <div className="flex gap-3">
                  <div className="flex items-center gap-1">
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      className="text-[#d12e71] text-xs transition-colors"
                      href={`${EXPLORER_URL}/tx/${transactionHash}`}
                    >
                      Track on Escan
                    </Link>
                    <UpRightArrowIcon className="text-[#262B30] h-1.5 w-1.5" />
                  </div>
                  {showBalanceLink && (
                    <div className="flex items-center gap-1">
                      <Link
                        className="text-[#d12e71] text-xs  transition-colors"
                        href={`/portfolio`}
                      >
                        View Balance in Evmos Portfolio
                      </Link>
                      <UpRightArrowIcon className="text-[#262B30] h-1.5 w-1.5" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {liquidStakeError && (
              <div
                style={{ height: "50px" }}
                className={`text-sm  border-2 border-[#262B30] text-red items-center flex-col justify-center relative overflow-hidden rounded-lg  px-4 transition-all duration-300 ease-inOutBack md:px-3 flex py-[10px]`}
              >
                {liquidStakeError}
              </div>
            )}
            <Button
              disabled={loadingLiquidStake || stakedAmount === 0}
              onClick={handleLiquidStake}
              intent="tertiary"
              size="lg"
              attributes={{ width: "$full" }}
            >
              <Box as="span" mr="$2">
                {loadingLiquidStake ? "Loading..." : "Liquid Stake"}
              </Box>
              {!loadingLiquidStake && (
                <>
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
                </>
              )}
            </Button>
          </div>
        )}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default function Stride() {
  return (
    <ThemeProvider>
      <StrideWidget />
    </ThemeProvider>
  );
}
