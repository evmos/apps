// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import { TrackerEvent } from "@evmosapps/ui-helpers";

import { DiscordIcon } from "@evmosapps/icons/DiscordIcon";
import { GithubIcon } from "@evmosapps/icons/GithubIcon";
import { TelegramIcon } from "@evmosapps/icons/TelegramIcon";
import { TwitterIcon } from "@evmosapps/icons/TwitterIcon";
import { WebsiteIcon } from "@evmosapps/icons/WebsiteIcon";

import { DescriptionItem } from "./description-item";
import { DApp } from "../../../lib/fetch-explorer-data";
import { EcosystemCard } from "../../landing/partials/ecosystem-card";
import { translation } from "@evmosapps/i18n/server";
import { EcosystemCardGrid } from "../../landing/partials/ecosystem-card-grid";
import { DescriptionLink } from "./description-link";
import { CLICK_SOCIAL_BUTTON } from "tracker";

import { IconArrowTopRight } from "@evmosapps/ui/icons/line/arrows/arrow-top-right.tsx";

import { IconLightning } from "@evmosapps/ui/icons/filled/images/lightning.tsx";

import { Button } from "@evmosapps/ui/button/index.tsx";

import Image from "next/image";
import { Carousel } from "./carousel";
import { FavoriteButton } from "./favorite-button";
import { DynamicSections } from "../../landing/partials/DynamicSections";
import { ShareDropdown } from "../share-dropdown";

//Adapt the page to each Dapp
const getSlugClass = (slug: string): string => {
  const slugClasses: Record<string, string> = {
    "leap-elements": "max-w-5xl",
  };
  return slugClasses[slug] || "max-w-lg";
};

export const DescriptiondApp = async ({
  dapp,
  relatedApps,
  widget,
}: {
  dapp: DApp;
  relatedApps: DApp[];
  widget?: React.ReactNode;
}) => {
  const { t } = await translation("dappStore");

  return (
    <div className="lg:space-y-12 mb-12 lg:mb-24">
      <div className="flex flex-col lg:flex-row items-center gap-4 md:gap-8 mb-10 -mt-24 md:mt-0">
        {/* dapp icon */}
        <div className="relative w-20 h-20 aspect-square rounded-[1rem] overflow-hidden flex shrink-0">
          {dapp.icon && (
            <Image
              src={dapp.icon.src}
              blurDataURL={dapp.icon.blurDataURL}
              placeholder="blur"
              alt={dapp.name}
              fill={true}
              className="object-cover shrink-0"
              sizes={"400w"}
            />
          )}
        </div>
        {/* dapp name */}
        <div className="flex flex-col grow shrink basis-0 justify-start items-baseline gap-2 lg:flex-row">
          <div>
            <h1 className="text-xl lg:text-5xl lg:text-4xl leading-[48px] mx-auto lg:mx-0 text-heading dark:text-heading-dark">
              {dapp.name}
            </h1>
            <h1 className=" mt-3 mx-auto lg:mx-0 text-paragraph dark:text-paragraph-dark">
              {dapp.oneLiner}
            </h1>
          </div>
          {/* Instant dapp badge */}
          {dapp.instantDapp && (
            <div className="flex items-center gap-px mx-auto -ml-1 lg:mx-0">
              <div className="relative">
                <IconLightning className="h-3 w-3 mb-0.5 text-primary-container dark:text-primary-container-dark" />
              </div>
              <p className="text-primary dark:text-primary-dark text-[13px] mb-0.5">
                {t("instantdApp.badge")}
              </p>
            </div>
          )}
          {/* No-instant-dapp button mobile */}
          {!dapp.instantDapp && dapp.dapp.url && (
            <div className="block lg:hidden mx-auto">
              <DescriptionLink href={dapp.dapp.url}>
                <Button variant={"primary"} className="w-full mb-3">
                  {t("ecosystem.open")} <IconArrowTopRight />
                </Button>
              </DescriptionLink>
              <div className="flex items-center justify-center">
                <p className="text-xs text-subheading dark:text-subheading-dark">
                  {t("ecosystem.noInstantdApps")}
                </p>
              </div>
            </div>
          )}
        </div>
        {/* Share and favorite icons */}
        <div className="flex justify-end items-center gap-4 mx-auto lg:mx-0">
          <ShareDropdown
            dapp={{
              slug: dapp.slug,
              categorySlug: dapp.categorySlug,
            }}
          />
          <FavoriteButton
            dapp={{
              name: dapp.name,
              icon: {
                blurDataURL: dapp.icon?.blurDataURL || "",
                src: dapp.icon?.src || "",
              },
              instantDapp: dapp.instantDapp,
              slug: dapp.slug,
              categorySlug: dapp.categorySlug,
            }}
          />
        </div>
      </div>

      {/* dApp body */}
      <div className="flex flex-col lg:flex-row gap-y-12 lg:gap-y-24 gap-x-24 items-start mb-10">
        <div className=" w-full grid gap-y-8 order-2 lg:order-1">
          {dapp.description && (
            <DescriptionItem
              title={t("instantdApp.description.title", {
                name: dapp.name,
              })}
            >
              <p>{dapp.description}</p>
            </DescriptionItem>
          )}
          {dapp.howTo && (
            <DescriptionItem
              title={t("instantdApp.howTo.title", {
                name: dapp.name,
              })}
            >
              <p>{dapp.howTo}</p>
            </DescriptionItem>
          )}

          <div className="flex gap-8">
            <div className="w-1/2">
              {(dapp.x || dapp.discord || dapp.telegram) && (
                <DescriptionItem title={t("instantdApp.social")}>
                  {dapp.x.url && (
                    <TrackerEvent
                      event={CLICK_SOCIAL_BUTTON}
                      properties={{ "dApp Social Type": "X" }}
                    >
                      <DescriptionLink href={dapp.x.url}>
                        <TwitterIcon width={16} height={16} />
                      </DescriptionLink>
                    </TrackerEvent>
                  )}
                  {dapp.discord.url && (
                    <TrackerEvent
                      event={CLICK_SOCIAL_BUTTON}
                      properties={{ "dApp Social Type": "Discord" }}
                    >
                      <DescriptionLink href={dapp.discord.url}>
                        <DiscordIcon width={20} height={20} />
                      </DescriptionLink>
                    </TrackerEvent>
                  )}

                  {dapp.telegram.url && (
                    <TrackerEvent
                      event={CLICK_SOCIAL_BUTTON}
                      properties={{ "dApp Social Type": "Telegram" }}
                    >
                      <DescriptionLink href={dapp.telegram.url}>
                        <TelegramIcon width={20} height={20} />
                      </DescriptionLink>
                    </TrackerEvent>
                  )}

                  {dapp.github && (
                    <TrackerEvent
                      event={CLICK_SOCIAL_BUTTON}
                      properties={{ "dApp Social Type": "GitHub" }}
                    >
                      <DescriptionLink href={dapp.github} type="GitHub">
                        <GithubIcon width={20} height={20} />
                      </DescriptionLink>
                    </TrackerEvent>
                  )}
                </DescriptionItem>
              )}
            </div>
            <div className="w-1/2">
              {dapp.dapp.url && (
                <DescriptionItem title={t("instantdApp.website.title")}>
                  <TrackerEvent
                    event={CLICK_SOCIAL_BUTTON}
                    properties={{ "dApp Social Type": "dApp Website" }}
                  >
                    <DescriptionLink href={dapp.dapp.url}>
                      <WebsiteIcon width={20} height={20} />{" "}
                      <p>{dapp.dapp.label}</p>
                    </DescriptionLink>
                  </TrackerEvent>
                </DescriptionItem>
              )}
            </div>
          </div>
        </div>
        {/* Widget or carousel */}
        <div className="w-full order-1 lg:order-2">
          {!!widget && (
            <div className={`w-full  mx-auto grow ${getSlugClass(dapp.slug)}`}>
              <div className="flex items-center justify-center h-full">
                {widget}
              </div>
            </div>
          )}
          {!widget && (
            <div className="w-full">
              <div className="mb-8">
                <Carousel images={dapp.gallery} />
              </div>
              {dapp.dapp.url && (
                <div className="hidden md:block">
                  <DescriptionLink href={dapp.dapp.url}>
                    <Button variant={"primary"} className="w-full mb-3">
                      {t("ecosystem.open")}
                      <IconArrowTopRight />
                    </Button>
                  </DescriptionLink>
                  <div className="flex items-center justify-center">
                    <p className="text-xs text-subheading dark:text-subheading-dark">
                      {t("ecosystem.noInstantdApps")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related dapps */}
      <div className="flex justify-between items-center md:items-start">
        <h2 className="text-xl text-heading dark:text-heading-dark mb-5 md:-mb-10">
          {t("instantdApp.relatedApps.title")}
        </h2>
      </div>
      <EcosystemCardGrid>
        {relatedApps
          ?.slice(0, 8)
          .map((dApp) => <EcosystemCard data={dApp} key={dApp.name} />)}
      </EcosystemCardGrid>
      {/* Explore dapps banner */}
      <DynamicSections placement={"DApp Details Page"} />
    </div>
  );
};
