"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cache, useEffect } from "react";
import { useAccount } from "wagmi";
import { EvmosCopilotRedIcon } from "icons";

import { PrimaryButton } from "@evmosapps/ui-helpers";
import { assertIf, raise } from "helpers";
import { get } from "lodash-es";
import { useQuery } from "@tanstack/react-query";
export const CYPHERD_API_KEY = process.env.NEXT_PUBLIC_CYPHERD_KEY ?? "";

type Cypher = (args: Record<string, string>) => void;

const getCypherObject = () => {
  const cypher = get(window, "Cypher") as Cypher | undefined;

  return cypher ?? null;
};

const getCypher = cache(async function getCypher(): Promise<Cypher> {
  let cypher = getCypherObject();
  if (cypher) return cypher;

  assertIf(document.readyState !== "complete", "FAILED_TOLOAD");

  return new Promise((resolve) => {
    const documentStateChange = (event: Event) => {
      if (
        event.target &&
        (event.target as Document).readyState === "complete"
      ) {
        cypher = getCypherObject() ?? raise("FAILED_TOLOAD");

        resolve(cypher);
        document.removeEventListener("readystatechange", documentStateChange);
      }
    };
    document.addEventListener("readystatechange", documentStateChange);
  });
});

const CypherD = () => {
  const { address } = useAccount();

  const { data: cypher } = useQuery({
    gcTime: 0,
    queryKey: ["cypherClient"],
    queryFn: getCypher,
  });

  useEffect(() => {
    if (address === undefined) {
      const cypherElement = document?.getElementById("cyd-popup-background");
      if (cypherElement) {
        cypherElement.parentNode?.removeChild(cypherElement);
      }
    }

    if (!address || !cypher) return;

    void cypher({
      address,
      theme: "light",
      targetChainIdHex: "0x2329", // Evmos ChainID
      appId: CYPHERD_API_KEY,
      parentComponentId: "cypher-onboading-sdk", // Id of the <div> tag inside which the widget is needed
    });
  }, [address, cypher]);

  if (address === undefined) {
    return (
      <div
        className="relative after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:z-10 after:bg-[rgba(0,0,0,.3)] 
        z-[10] h-[450px] bg-center bg-no-repeat bg-cover bg-[url(/ecosystem/cypher-blur.png)] flex flex-col justify-center"
      >
        <div className="z-20 text-center flex flex-col items-center space-y-2">
          <EvmosCopilotRedIcon height={30} />
          <p className="text-pearl ">Connection required</p>
          <p>
            Please connect your account in order to interact with the Cypher
            Wallet Instant dApp
          </p>
          <PrimaryButton as="a" variant={"primary"} href="?action=connect">
            Connect
          </PrimaryButton>
        </div>
      </div>
    );
  }
  return (
    <div // div inside which the widget will be present
      data-testid="cypher-onboading-sdk"
      id="cypher-onboading-sdk" // Id that will be passed to the window.Cypher() call
      className="flex h-full flex-col items-center justify-center z-[1]"
    />
  );
};

export default CypherD;