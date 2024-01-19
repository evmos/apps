// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";

import { Badge, TrackerEvent } from "@evmosapps/ui-helpers";

import { CLICK_ON_FEATURED_DAPP } from "tracker";

import { Link } from "@evmosapps/i18n/client";
import { UpRightArrowIcon } from "@evmosapps/icons/UpRightArrowIcon";
import { DApp } from "../../../lib/fetch-explorer-data";

import Image from "next/image";

export const EcosystemCard = ({ data }: { data: DApp }) => {
  const img = data.thumbnail;

  return (
    <TrackerEvent
      event={CLICK_ON_FEATURED_DAPP}
      properties={{ "dApp Name": data.name }}
    >
      <Link
        href={
          data.instantDapp
            ? `/dapps/${data.categorySlug}/${data.slug}`
            : data.dapp.url ?? ""
        }
        target={data.instantDapp ? "" : "_blank"}
        key={data.name}
        className="relative space-y-2 rounded-lg bg-[#262017] pb-8 transition-all duration-150 ease-out hover:scale-105 overflow-hidden"
      >
        <div className="relative aspect-[3/2] w-full bg-white/5 overflow-hidden">
          {img && (
            <Image
              src={img.src}
              blurDataURL={img.blurDataURL}
              placeholder="blur"
              className="object-cover"
              alt={data.name}
              fill={true}
              sizes="400w"
            />
          )}
        </div>
        <div className="flex space-x-3 items-center px-5 pt-5">
          <h3 className="font-bold text-sm text-pearl">{data.name}</h3>
          {data.instantDapp ? (
            <Badge
              className="text-xs gap-x-2 whitespace-nowrap overflow-hidden"
              data-testid="badge-instant-dapp"
            >
              <span className="w-[6px] h-[6px] aspect-square bg-purple-400 rounded-full" />
              <span className="overflow-ellipsis overflow-hidden">
                Instant dApp
              </span>
            </Badge>
          ) : (
            <div
              className="rounded-full h-6 w-6 flex justify-center items-center bg-black-500 border-black-200 border text-pearl"
              data-testid="badge-external-link"
            >
              <UpRightArrowIcon className="h-2 w-2" />
            </div>
          )}
        </div>
        <p className="px-5 text-xs md:text-sm text-white opacity-70 overflow-hidden line-clamp-3">
          {data.oneLiner || data.description}
        </p>
      </Link>
    </TrackerEvent>
  );
};
