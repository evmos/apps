"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ADD_DAPP_FORM_URL, DOCS_EVMOS } from "constants-helper";
import Image from "next/image";
import { Frameline, PrimaryButton } from "ui-helpers";
export const HeroSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 space-x-8">
      <div
        className="w-full bg-cover bg-no-repeat flex flex-col space-y-8 p-5 pr-0 "
        style={{
          backgroundImage: `url(/ecosystem/galaxy.png)`,
        }}
      >
        {/* TODO: add localization */}
        <h1
          className="font-evmos font-bold text-5xl tracking-wide text-[#FFF4E1]"
          style={{ fontFeatureSettings: "'ss02' on, 'ss01' on" }}
        >
          Earn revenue by deploying your dApp
        </h1>
        <p className="border-b border-t border-[#FFF4E1] border-opacity-40 py-2 text-sm  text-[#FFF4E1] font-brand w-fit">
          Interested in adding your dApp to our dApp Store and earning revenue?
        </p>
        <div className="flex items-center space-x-2 xl:w-[80%] 2xl:w-[61%]">
          <PrimaryButton
            className="flex-1 font-normal rounded"
            onClick={() => {
              window.open(ADD_DAPP_FORM_URL, "_blank");
            }}
          >
            Add your dApp
          </PrimaryButton>
          <PrimaryButton
            className="flex-1 font-normal rounded"
            variant="secondary"
            onClick={() => {
              window.open(DOCS_EVMOS, "_blank");
            }}
          >
            Learn to build on Evmos
          </PrimaryButton>
        </div>
      </div>

      <Frameline variant="secondary">
        <div
          className="flex items-center justify-center relative 
        before:content-[''] before:absolute before:top-[50%] before:left-0 
        before:-translate-y-1/2 before:w-[20px] before:h-[20px] before:animate-pulse before:bg-[#9F05FE] before:rounded-full"
        >
          <Image
            src="/ecosystem/hero-img.svg"
            alt="hero-img"
            width={250}
            height={150}
            className="object-contain "
          />
        </div>
      </Frameline>
    </div>
  );
};
