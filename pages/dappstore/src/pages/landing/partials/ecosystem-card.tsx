// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";

import { TrackerEvent } from "@evmosapps/ui-helpers";

import { CLICK_ON_FEATURED_DAPP } from "tracker";

import { Link } from "@evmosapps/i18n/client";
import { DApp } from "../../../lib/fetch-explorer-data";

import Image from "next/image";
import { cn } from "helpers";
import { Card } from "@evmosapps/ui/components/cards/Card.tsx";
import { Icon } from "./Icon";
import { IconLightning } from "@evmosapps/ui/icons/filled/images/lightning.tsx";

export const EcosystemCard = ({ data }: { data: DApp }) => {
  const img = data.thumbnail;

  return (
    <TrackerEvent
      event={CLICK_ON_FEATURED_DAPP}
      properties={{ "dApp Name": data.name }}
    >
      <Link
        href={`/dapps/${data.categorySlug}/${data.slug}`}
        key={data.name}
        className="transition-all duration-150 ease-out hover:scale-105 overflow-hidden "
      >
        <Card className="w-full" key={data.name}>
          <div className="">
            <div
              className={cn(
                "relative h-[150px]",
                "after:bg-gradient-to-t after:from-surface-container-lowest-dark/100 after:to-transparent after:absolute after:w-full after:h-full after:bottom-0",
              )}
            >
              {img && (
                <Image
                  src={img.src}
                  blurDataURL={img.blurDataURL}
                  placeholder="blur"
                  className="object-cover rounded-t-xl"
                  alt={data.name}
                  fill={true}
                  sizes="400w"
                />
              )}
            </div>

            <div className="px-4 py-4 flex gap-4 -mt-5 pb-6">
              <Icon data={data} />
              <div>
                <div className="flex gap-1">
                  <h5 className="heading text-base px-0.5">{data.name}</h5>
                  {data.instantDapp && (
                    <div className="justify-start items-center gap-px flex">
                      <div className="relative">
                        <IconLightning className="h-3 w-3 text-primary-container dark:text-primary-container-dark" />
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs md:text-sm text-paragraph dark:text-paragraph-dark overflow-hidden line-clamp-1 text-ellipsis">
                  {data.oneLiner || data.description}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </TrackerEvent>
  );
};
