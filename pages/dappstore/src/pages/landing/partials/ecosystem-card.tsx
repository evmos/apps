"use server";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Image from "next/image";

import { Badge, TrackerEvent } from "@evmosapps/ui-helpers";

import { CLICK_ON_FEATURED_DAPP } from "tracker";

import { Link } from "@evmosapps/i18n/client";
import { UpRightArrowIcon } from "icons";
import { DApp } from "../../../lib/fetch-explorer-data";

export const EcosystemCard = ({ data }: { data: DApp }) => {
  const img = data.cover ?? data.icon;

  return (
    <TrackerEvent
      event={CLICK_ON_FEATURED_DAPP}
      properties={{ featured: data.name }}
    >
      <Link
        href={
          data.instantDapp
            ? `/dapps/${data.categorySlug}/${data.slug}`
            : data.dapp ?? ""
        }
        target={data.instantDapp ? "" : "_blank"}
        key={data.name}
        className="relative mb-16 space-y-2 rounded-lg bg-[#262017] pb-8 transition-all duration-150 ease-out hover:scale-105 overflow-hidden"
      >
        <div className="relative aspect-[3/2] w-full bg-white/5 overflow-hidden">
          {img && (
            <Image
              className="object-cover"
              src={img}
              alt={data.name}
              fill={true}
              sizes="400w"
            />
          )}
        </div>
        <div className="flex space-x-3 items-center px-5 pt-5">
          <h3 className="text-sm font-bold text-pearl">{data.name}</h3>
          {data.instantDapp ? (
            <Badge className="text-sm space-x-2 ">
              {/* TODO: check if we need to create a component for this */}
              {/* TODO: add color to tailwind file */}
              <span className="w-[8px] h-[8px] bg-[#AE00FF] rounded-full" />
              <p>Instant dApp </p>
            </Badge>
          ) : (
            <div className="rounded-full h-6 w-6 flex justify-center items-center border border-[#FFF4E173]">
              <UpRightArrowIcon className="h-2 w-2" />
            </div>
          )}
        </div>
        <p className="px-5 text-sm text-white opacity-70 overflow-hidden line-clamp-3">
          {data.description}
        </p>
      </Link>
    </TrackerEvent>
  );
};
