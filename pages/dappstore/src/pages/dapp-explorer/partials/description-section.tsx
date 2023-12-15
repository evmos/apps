// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Image from "next/image";
import {
  Badge,
  ButtonWithLink,
  Frameline,
  TrackerEvent,
} from "@evmosapps/ui-helpers";
import { Title } from "@evmosapps/ui-helpers/src/titles/Title";
import {
  DiscordIcon,
  GithubIcon,
  RightArrow,
  TelegramIcon,
  TwitterIcon,
  WebsiteIcon,
} from "icons";
import { HeroSection } from "../../landing/partials/hero-section";
import { DescriptionItem } from "./description-item";
import { DApp } from "../../../lib/fetch-explorer-data";
import { cn } from "helpers";
import dynamic from "next/dynamic";
import { EcosystemCard } from "../../landing/partials/ecosystem-card";
import { translation } from "@evmosapps/i18n/server";
import { EcosystemCardGrid } from "../../landing/partials/ecosystem-card-grid";
import { DescriptionLink } from "./description-link";
import { CLICK_SEE_MORE_BUTTON, CLICK_SOCIAL_BUTTON } from "tracker";

const WIDGETS: {
  [key: string]: React.ComponentType<{}>;
} = {
  layerswap: dynamic(
    () => import("@evmosapps/instant-dapps/src/dapps/Layerswap"),
    {
      loading: () => <p>Loading...</p>,
    }
  ),
  squid: dynamic(() => import("@evmosapps/instant-dapps/src/dapps/Squid"), {
    loading: () => <p>Loading...</p>,
  }),
  "cypher-wallet": dynamic(
    () => import("@evmosapps/instant-dapps/src/dapps/CypherD"),
    {
      loading: () => <p>Loading...</p>,
    }
  ),
  c14: dynamic(() => import("@evmosapps/instant-dapps/src/dapps/C14"), {
    loading: () => <p>Loading...</p>,
  }),
  transak: dynamic(() => import("@evmosapps/instant-dapps/src/dapps/Transak"), {
    loading: () => <p>Loading...</p>,
  }),
  wormhole: dynamic(
    () => import("@evmosapps/instant-dapps/src/dapps/Wormhole")
  ),
  forge: dynamic(() => import("@evmosapps/instant-dapps/src/dapps/Forge")),
  stride: dynamic(
    () => import("@evmosapps/instant-dapps/src/dapps/Stride/Stride")
  ),
};

export const DescriptiondApp = async ({
  dapp,
  relatedApps,
  totalApps,
}: {
  dapp: DApp;
  relatedApps: DApp[];
  totalApps: number;
}) => {
  const { t } = await translation("dappStore");

  const drawWidget = () => {
    const Widget = WIDGETS[dapp.slug];
    if (Widget) return <Widget />;
  };

  return (
    <div className="space-y-8 md:space-y-12 mb-12 lg:mb-24">
      <div className="relative">
        <div
          className={cn(
            "relative h-[250px] w-screen ml-[49%] -translate-x-1/2",
            // gradient overlay
            " after:bg-gradient-to-t after:from-black/70 after:to-transparent after:absolute after:w-full after:h-full after:bottom-0"
          )}
        >
          <Image
            src={dapp.cover?.src ?? "/ecosystem/galaxy.png"}
            blurDataURL={dapp.cover?.blurDataURL}
            placeholder="blur"
            alt={dapp.name}
            fill={true}
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <header
          className={cn(
            "flex flex-col items-center -mt-24 gap-4",
            "md:flex-row md:items-stretch lg:gap-x-8"
          )}
        >
          <div
            className={cn(
              "relative shrink-0 w-32 h-32 aspect-square rounded-[2rem] overflow-hidden",
              "md:w-36 md:h-36"
            )}
          >
            {dapp.icon && (
              <Image
                {...dapp.icon}
                alt={dapp.name}
                fill={true}
                className="object-cover"
                placeholder="blur"
                sizes={"400w"}
              />
            )}
          </div>
          <div
            className={cn(
              "relative text-center gap-8 flex flex-col w-full justify-between",
              "md:text-left"
            )}
          >
            <div className="flex flex-col md:flex-row items-center md:items-end space-y-2 md:space-y-0">
              <h1 className="text-[#E8DFD3] text-2xl md:text-5xl lg:text-8xl font-bold">
                {dapp.name}
              </h1>
              {dapp.instantDapp && (
                <div className="relative md:ml-auto shrink lg:-top-[19px]">
                  <Badge className="text-sm space-x-3 bg-transparent border border-[#FFF4E173] whitespace-nowrap md:text-base md:px-4 md:py-1.5">
                    <span className="w-[10px] h-[10px] bg-purple-400 rounded-full" />
                    <p>{t("instantdApp.badge")}</p>
                  </Badge>
                </div>
              )}
            </div>
            <p className="text-[#D3CBC7] font-light lg:text-base">
              {dapp.oneLiner}
            </p>
          </div>
        </header>
      </div>
      <div className="flex flex-col lg:flex-row gap-y-12 lg:gap-y-24 gap-x-24 items-start">
        <div className=" w-full grid grid-rows-8 gap-y-8">
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

          {(dapp.x || dapp.discord || dapp.telegram) && (
            <DescriptionItem title={t("instantdApp.social")}>
              {dapp.x.url && (
                <TrackerEvent
                  event={CLICK_SOCIAL_BUTTON}
                  properties={{ "dApp Social Type": "X" }}
                >
                  <DescriptionLink href={dapp.x.url}>
                    <TwitterIcon width={20} height={20} /> <p>{dapp.x.label}</p>
                  </DescriptionLink>
                </TrackerEvent>
              )}
              {dapp.discord.url && (
                <TrackerEvent
                  event={CLICK_SOCIAL_BUTTON}
                  properties={{ "dApp Social Type": "Discord" }}
                >
                  <DescriptionLink href={dapp.discord.url}>
                    <DiscordIcon width={20} height={20} />{" "}
                    <p>{dapp.discord.label}</p>
                  </DescriptionLink>
                </TrackerEvent>
              )}

              {dapp.telegram.url && (
                <TrackerEvent
                  event={CLICK_SOCIAL_BUTTON}
                  properties={{ "dApp Social Type": "Telegram" }}
                >
                  <DescriptionLink href={dapp.telegram.url}>
                    <TelegramIcon width={20} height={20} />{" "}
                    <p>{dapp.telegram.label}</p>
                  </DescriptionLink>
                </TrackerEvent>
              )}
            </DescriptionItem>
          )}

          {dapp.github && (
            <DescriptionItem title={t("instantdApp.information.title")}>
              {dapp.github && (
                <TrackerEvent
                  event={CLICK_SOCIAL_BUTTON}
                  properties={{ "dApp Social Type": "GitHub" }}
                >
                  <DescriptionLink href={dapp.github} type="GitHub">
                    <GithubIcon width={20} height={20} />{" "}
                    <p>{t("instantdApp.information.options.github")}</p>
                  </DescriptionLink>
                </TrackerEvent>
              )}
              {/* TODO: add documentation */}
              {/* {dapp.documentation && (
                   <TrackerEvent
                  event={CLICK_SOCIAL_BUTTON}
                  properties={{ "dApp Social Type": "Documentation" }}
                >
                 <DescriptionLink href={dapp.documentation} >
                  <<DocumentationIcon width={20} height={20} />{" "}
                <p>Documentation</p>
                </DescriptionLink>
                </TrackerEvent>
                )}
           */}
            </DescriptionItem>
          )}
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
        {drawWidget() && (
          <Frameline
            className="w-full max-w-lg mx-auto grow"
            variant="secondary"
          >
            <div className="flex items-center justify-center h-full">
              {drawWidget()}
            </div>
          </Frameline>
        )}
      </div>

      <div
        className="flex flex-col justify-between space-y-4 md:flex-row md:space-y-0"
        style={{ marginBottom: "-1rem" }}
      >
        <Title tag="h3">{t("instantdApp.relatedApps.title")}</Title>
        <TrackerEvent event={CLICK_SEE_MORE_BUTTON}>
          <ButtonWithLink
            href={`/dapps/${dapp.categorySlug}`}
            className="md:self-center"
          >
            <div className="flex items-center space-x-2">
              <p>{t("instantdApp.relatedApps.button.text")}</p>
              <RightArrow width={11} height={11} />
            </div>
          </ButtonWithLink>
        </TrackerEvent>
      </div>
      <EcosystemCardGrid>
        {relatedApps?.map((dApp) => (
          <EcosystemCard data={dApp} key={dApp.name} />
        ))}
      </EcosystemCardGrid>

      <HeroSection totalApps={totalApps} />
    </div>
  );
};
