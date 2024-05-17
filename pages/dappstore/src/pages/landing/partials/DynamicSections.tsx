// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  Category,
  DApp,
  fetchExplorerData,
} from "../../../lib/fetch-explorer-data";
import { notion } from "helpers/src/clients/notion";
import {
  tryReadPropertyAs,
  tryResolveImageProp,
} from "helpers/src/clients/notion-utils";
import Image from "next/image";
import {
  Surface,
  SurfaceProps,
} from "@evmosapps/ui/components/surface/index.tsx";
import { Card, CardRanking } from "@evmosapps/ui/components/cards/Card.tsx";
import { ScrollableSection } from "../ScrollableSection";
import { Link } from "@evmosapps/i18n/client";
import { BannerCard } from "./banner-card";
import { Button } from "@evmosapps/ui/button/index.tsx";
import { cn } from "helpers/src/classnames";
import { IconLightning } from "@evmosapps/ui/icons/filled/images/lightning.tsx";
import { ComponentProps, PropsWithChildren } from "react";
import { IconButton } from "@evmosapps/ui/button/icon-button.tsx";
import { MaybeImage } from "@evmosapps/ui/headless/maybe-image.tsx";
import { IconArrowRight } from "@evmosapps/ui/icons/line/arrows/arrow-right.tsx";
import {
  fetchPageDynamicSections,
  DynamicSection,
} from "./fetchPageDynamicSections";
import { IconChartPie } from "@evmosapps/ui/icons/line/editor/chart-pie.tsx";
import { IconSearch } from "@evmosapps/ui/icons/line/basic/search.tsx";
import { IconArrowSwap } from "@evmosapps/ui/icons/line/arrows/arrow-swap.tsx";
import { IconShare } from "@evmosapps/ui/icons/line/basic/share.tsx";
import { IconDollarCircle } from "@evmosapps/ui/icons/line/finances/dollar-circle.tsx";
import { IconGrid07 } from "@evmosapps/ui/icons/line/grid/grid-07.tsx";
import { IconLink2 } from "@evmosapps/ui/icons/line/editor/link-2.tsx";
import { IconGames } from "@evmosapps/ui/icons/line/audiovisual/games.tsx";
import { IconGlobe } from "@evmosapps/ui/icons/line/map/globe.tsx";
import { IconListUnorderedRec } from "@evmosapps/ui/icons/line/editor/list-unordered-rec.tsx";
import { IconImage3 } from "@evmosapps/ui/icons/line/images/image-3.tsx";
import { IconLogIn2 } from "@evmosapps/ui/icons/line/arrows/log-in-2.tsx";
import { IconWallet } from "@evmosapps/ui/icons/line/finances/wallet.tsx";
import { IconElements } from "@evmosapps/ui/icons/line/grid/elements.tsx";
import { IconCalendarPerson } from "@evmosapps/ui/icons/line/time/calendar-person.tsx";
import { IconProcentCircle } from "@evmosapps/ui/icons/line/finances/procent-circle.tsx";
import { IconCloud } from "@evmosapps/ui/icons/line/weather/cloud.tsx";
import { IconUsers } from "@evmosapps/ui/icons/line/users/users.tsx";
import { getBackgroundImage } from "../../../getBackgroundImage";
import { CLICK_ON_FEATURED_DAPP } from "tracker";
import { TrackerEvent } from "@evmosapps/ui-helpers";

export const getDAppsMapByNotionId = async () => {
  const { dApps } = await fetchExplorerData();
  return dApps.reduce<Record<string, DApp>>((acc, dapp) => {
    acc[dapp.id] = dapp;
    return acc;
  }, {});
};
export async function DynamicSections({ placement }: { placement: string }) {
  const sections = await fetchPageDynamicSections(placement);
  return (
    <div className="flex flex-col gap-y-8">
      {sections.map((section, i) => {
        switch (section.displayType) {
          case "HighlightCards":
            return <HighlightCardsSection key={i} {...section} />;
          case "DAppListCarousel":
            return <DAppListCarouselSection key={i} {...section} />;
          case "Banner":
            return <BannerSection key={i} {...section} />;
          case "DAppRanking":
            return <DAppRankingSection key={i} {...section} />;
          case "CategoryList":
            return <CategoryListSection key={i} {...section} />;
          case "DAppListGrid":
            return <DAppListGridSection key={i} {...section} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

const fetchCardInfo = async (cardId: string) => {
  const cardPage = await notion.pages.retrieve({ page_id: cardId });
  const titleProp = tryReadPropertyAs(cardPage, "Name", "title");
  const subtitleProp = tryReadPropertyAs(cardPage, "Subtitle", "rich_text");
  const tagProp = tryReadPropertyAs(cardPage, "Tag", "rich_text");
  const targetProp = tryReadPropertyAs(cardPage, "Target", "url");
  const imageProp = await tryResolveImageProp(cardPage, "Background Image");
  return {
    title: titleProp.title.map((t) => t.plain_text).join(""),
    subtitle: subtitleProp.rich_text.map((t) => t.plain_text).join(""),
    tag: tagProp.rich_text.map((t) => t.plain_text).join(""),
    target: targetProp.url ?? "/",
    image: imageProp.at(0) ?? null,
  };
};

const HighlightCardsSection = async ({ cardsIds }: DynamicSection) => {
  const cards = await Promise.all(cardsIds.map((id) => fetchCardInfo(id)));

  return (
    <div
      className={cn(
        "gap-4 flex-none relative flex overflow-x-auto scrollbar-hidden",
        "w-[calc(100%+40px)] -ml-5 px-5",
        "md:w-[calc(100%+112px)] md:-ml-14 md:px-14",
        "lg:w-auto lg:ml-0 lg:px-0 lg:overflow-x-visible",
      )}
    >
      {cards.map(({ title, subtitle, image, tag, target }, i) => (
        <Link
          key={i}
          href={target}
          className="w-11/12 max-w-96 lg:max-w-none lg:w-full lg:flex-1 flex-none"
        >
          <TrackerEvent
            event={CLICK_ON_FEATURED_DAPP}
            properties={{
              "dApp Name": title,
              Section: "Highlighted Category",
            }}
          >
            <Card
              lowest
              className={cn(
                "h-56 shape-binding px-8 py-8 flex-col flex relative bg-cover w-full shrink-0",
                "before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-surface-dark/50",
              )}
              style={{
                backgroundImage: image
                  ? getBackgroundImage({
                      src: image.src,
                      width: 560,
                      height: 240,
                    })
                  : undefined,
              }}
              fullWidth
              background="bg-galaxy-red"
            >
              <h3 className="relative text-subheading dark:text-subheading-dark grow tracking-widest uppercase text-xs">
                {tag}
              </h3>
              <div className="relative mt-auto">
                <h3 className="text-base text-heading dark:text-heading-dark">
                  {title}
                </h3>
                <h4 className="text-sm">{subtitle}</h4>
              </div>
            </Card>
          </TrackerEvent>
        </Link>
      ))}
    </div>
  );
};
async function DAppListGridSection({
  dAppIds,
  ctaLabel,
  title,
}: DynamicSection) {
  const dappsMapByNotionId = await getDAppsMapByNotionId();
  const resolvedDApps = dAppIds.flatMap((dAppId) => {
    const dApp = dappsMapByNotionId[dAppId];
    if (!dApp) {
      return [];
    }
    return [dApp];
  });

  return (
    <DAppStorePicks>
      <DAppStorePicks.Header href="/dapps" cta={ctaLabel}>
        {title}
      </DAppStorePicks.Header>
      <DAppStorePicks.Body>
        {resolvedDApps.map((dapp) => (
          <TrackerEvent
            key={dapp.slug}
            event={CLICK_ON_FEATURED_DAPP}
            properties={{
              "dApp Name": dapp.name,
              Section: title,
            }}
          >
            <DAppStorePicks.DAppCard {...dapp} />
          </TrackerEvent>
        ))}
      </DAppStorePicks.Body>
    </DAppStorePicks>
  );
}
async function CategoryListSection({
  categoryIds,
  ctaLabel,
  title,
}: DynamicSection) {
  const categoriesMapByNotionId = await fetchExplorerData().then(
    ({ categories }) =>
      categories.reduce<Record<string, Category>>((acc, category) => {
        acc[category.notionId] = category;
        return acc;
      }, {}),
  );

  const resolvedCategories = categoryIds.flatMap((categoryId) => {
    const category = categoriesMapByNotionId[categoryId];
    if (!category) {
      return [];
    }
    return [category];
  });
  return (
    <DAppStorePicks>
      <DAppStorePicks.Header href="/dapps" cta={ctaLabel}>
        {title}
      </DAppStorePicks.Header>
      <DAppStorePicks.Body className="lg:grid-cols-2 xl:grid-cols-4">
        {resolvedCategories.map((category) => (
          <TrackerEvent
            key={category.slug}
            event={CLICK_ON_FEATURED_DAPP}
            properties={{
              "dApp Name": category.name,
              Section: title,
            }}
          >
            <DAppStorePicks.CategoryCard key={category.slug} {...category} />
          </TrackerEvent>
        ))}
      </DAppStorePicks.Body>
    </DAppStorePicks>
  );
}

async function DAppListCarouselSection({ title, dAppIds }: DynamicSection) {
  const dappsMapByNotionId = await getDAppsMapByNotionId();
  const resolvedDApps = dAppIds.flatMap((dAppId) => {
    const dApp = dappsMapByNotionId[dAppId];
    if (!dApp) {
      return [];
    }
    return [dApp];
  });

  return (
    <ScrollableSection title={title}>
      {resolvedDApps.map(
        ({ name, icon, categories, categorySlug, slug, instantDapp }) => (
          <Link href={`/dapps/${categorySlug}/${slug}`} key={slug}>
            <TrackerEvent
              event={CLICK_ON_FEATURED_DAPP}
              properties={{
                "dApp Name": name,
                Section: title,
              }}
            >
              <Surface
                lowest
                className="w-60 flex-none flex flex-col gap-y-2  p-4"
              >
                <MaybeImage
                  className="rounded-lg"
                  {...icon}
                  alt={name}
                  width={48}
                  height={48}
                />

                <DAppTitle instantDapp={instantDapp}>{name}</DAppTitle>

                <div className="gap-1 inline-flex">
                  {categories.map((category) => (
                    <Badge key={category.slug}>{category.name}</Badge>
                  ))}
                </div>
              </Surface>
            </TrackerEvent>
          </Link>
        ),
      )}
    </ScrollableSection>
  );
}

async function DAppRankingSection({ title, dAppIds }: DynamicSection) {
  const dappsMapByNotionId = await getDAppsMapByNotionId();

  const resolvedDApps = dAppIds.flatMap((dAppId) => {
    const dApp = dappsMapByNotionId[dAppId];
    if (!dApp) {
      return [];
    }
    return [dApp];
  });
  return (
    <ScrollableSection title={title}>
      {resolvedDApps.map(
        (
          {
            name,
            icon,
            categorySlug,
            slug,
            thumbnail,
            categories,
            instantDapp,
          },
          i,
        ) => (
          <Card
            low
            className="bg-cover overflow-hidden flex-col w-60 flex shrink-0"
            key={slug}
          >
            <TrackerEvent
              event={CLICK_ON_FEATURED_DAPP}
              properties={{
                "dApp Name": name,
                Section: title,
              }}
            >
              <Link href={`/dapps/${categorySlug}/${slug}`}>
                <div
                  className={cn(
                    "relative after:absolute after:top-0 after:left-0 after:w-full after:h-full",
                    "after:bg-gradient-to-t after:from-surface-container-low-dark after:to-surface-container-low-dark/30 after:from-10%",
                  )}
                >
                  {thumbnail && (
                    <Image
                      className="relative w-full"
                      {...thumbnail}
                      alt={name}
                      width={240}
                      height={132}
                    />
                  )}
                </div>
                <CardRanking>{i + 1}</CardRanking>
                <div className="relative px-4 py-4 flex gap-4 -mt-8 items-center w-full">
                  <MaybeImage
                    className="rounded-lg"
                    {...icon}
                    alt={name}
                    width={48}
                    height={48}
                  />
                  <div className="w-full flex flex-col grow-1 overflow-hidden">
                    <DAppTitle instantDapp={instantDapp} displayText={false}>
                      {name}
                    </DAppTitle>
                    {/* add space between title and badge */}
                    <div className="gap-1 inline-flex pt-1">
                      <Badge key={categories[0]?.slug}>
                        {categories[0]?.name}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Link>
            </TrackerEvent>
          </Card>
        ),
      )}
    </ScrollableSection>
  );
}

function BannerSection({
  mobileBannerImage,
  desktopBannerImage,
  title,
  description,
  ctaTarget,
  ctaLabel,
}: DynamicSection) {
  return (
    <BannerCard>
      {mobileBannerImage && (
        <BannerCard.BgImage
          {...mobileBannerImage}
          fill
          alt="bg"
          sizes="560w"
          className="lg:hidden"
        />
      )}
      {desktopBannerImage && (
        <BannerCard.BgImage
          fill
          {...desktopBannerImage}
          alt="bg"
          sizes="100vw"
          className="hidden lg:block"
        />
      )}
      <BannerCard.Body>
        <h3 className="text-heading dark:text-heading-dark text-lg md:text-xl mb-1">
          {title}
        </h3>

        <p className="dark:text-subheading-dark text-sm mb-6">{description}</p>

        {ctaTarget && (
          <TrackerEvent
            event={CLICK_ON_FEATURED_DAPP}
            properties={{
              "dApp Name": description,
              Section: "Banner",
            }}
          >
            <Button
              className="px-8"
              as={Link}
              href={ctaTarget.url}
              variant={"primary"}
              size="md"
              data-testid="open-connect-modal"
            >
              {ctaLabel}
            </Button>
          </TrackerEvent>
        )}
      </BannerCard.Body>
    </BannerCard>
  );
}
function DAppStorePicks({ className, ...props }: SurfaceProps) {
  return (
    <Surface className={cn("gap-5 flex flex-col py-6", className)} {...props} />
  );
}

const Badge = ({ children, className, ...props }: ComponentProps<"span">) => (
  <span
    className={cn(
      "text-xs rounded-[4px] px-2 leading-normal",
      "text-paragraph dark:text-paragraph-dark",
      "bg-surface-container-high dark:bg-surface-container-high-dark",

      className,
    )}
    {...props}
  >
    {children}
  </span>
);
DAppStorePicks.Header = function DAppStorePicksHeader({
  className,
  children,
  cta,
  href,
  ...props
}: ComponentProps<"header"> & { href: string; cta?: string }) {
  return (
    <header className={cn("flex px-4 items-center", className)} {...props}>
      <h3 className="text-heading dark:text-heading-dark  text-lg">
        {children}
      </h3>
      <Link href={href} className="ml-auto flex gap-4 items-center">
        {cta || "View all"}
        <IconButton
          as="span"
          className="ml-auto"
          variant="low-emphasis"
          size="sm"
        >
          <IconArrowRight />
        </IconButton>
      </Link>
    </header>
  );
};
DAppStorePicks.Body = function DAppStorePicksBody({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("grid lg:grid-cols-2 px-4 gap-3", className)} {...props}>
      {children}
    </div>
  );
};
DAppStorePicks.DAppCard = function DAppStorePicksDAppCard({
  name,
  icon,
  instantDapp,
  categorySlug,
  categories,
  slug,
}: Pick<
  DApp,
  "name" | "icon" | "categorySlug" | "categories" | "slug" | "instantDapp"
>) {
  return (
    <Link href={`/dapps/${categorySlug}/${slug}`}>
      <Card
        low
        className="overflow-hidden flex-row shrink-0 gap-4 p-3 w-full hover:bg-surface-container hover:dark:bg-surface-container-dark transition-colors duration-150 items-center group"
      >
        <MaybeImage {...icon} alt={name} width={56} height={56} />
        <div>
          <DAppTitle instantDapp={instantDapp}>{name}</DAppTitle>
          <div className="gap-1 inline-flex">
            {categories.map((category) => (
              <Badge key={category.slug}>{category.name}</Badge>
            ))}
          </div>
        </div>
        <Button
          className="ml-auto hidden group-hover:block"
          variant="low-emphasis"
        >
          Open
        </Button>
      </Card>
    </Link>
  );
};
// TODO: Different categories should have different icons and color, we should populate the table below
const colors = {
  primary: "#FF8C5C",
  purple: "#D8B9FF",
  indigo: "#AFC6FF",
  green: "#9BD679",
  rose: "#FA9DB2",
  pink: "#FFAEDB",
  cyan: "#AAEDFF",
};
const CATEGORY_PROPS: Record<
  string,
  {
    color: string;
    Icon: React.ComponentType;
  }
> = {
  "instant-dapps": { color: colors.primary, Icon: IconLightning },
  analytics: { color: colors.purple, Icon: IconChartPie },
  "block-explorer": { color: colors.indigo, Icon: IconSearch },
  "bridge-and-swap": { color: colors.green, Icon: IconArrowSwap },
  bridge: { color: colors.rose, Icon: IconShare },
  "centralized-exchange": { color: colors.pink, Icon: IconDollarCircle },
  dashboard: { color: colors.cyan, Icon: IconGrid07 },
  defi: { color: colors.purple, Icon: IconLink2 },
  gaming: { color: colors.indigo, Icon: IconGames },
  "governance-and-dao": { color: colors.green, Icon: IconGlobe },
  indexer: { color: colors.rose, Icon: IconListUnorderedRec },
  launchpad: { color: colors.cyan, Icon: IconElements },
  nft: { color: colors.purple, Icon: IconImage3 },
  "on-ramp": { color: colors.indigo, Icon: IconLogIn2 },
  oracles: { color: colors.green, Icon: IconCloud },
  otc: { color: colors.rose, Icon: IconUsers },
  services: { color: colors.pink, Icon: IconCalendarPerson },
  staking: { color: colors.cyan, Icon: IconProcentCircle },
  wallet: { color: colors.purple, Icon: IconWallet },
};

DAppStorePicks.CategoryCard = function DAppStorePicksCategoryCard({
  name,
  slug,
}: Pick<Category, "name" | "slug">) {
  const { Icon, color } = CATEGORY_PROPS[slug] ?? {
    color: colors.purple,
    Icon: IconLightning,
  };
  return (
    <Link href={`/dapps/${slug}`}>
      <Surface
        low
        className="hover:bg-surface-container hover:dark:bg-surface-container-dark transition-colors duration-150 p-4 rounded-lg flex-row gap-6 items-center"
      >
        <div
          className={cn(
            "rounded-xl w-14 h-14 flex items-center justify-center shadow flex-none",
          )}
          style={{ backgroundColor: color + "1A", color }}
        >
          <Icon className="h-6 w-6" />
        </div>

        <h3 className="text-heading dark:text-heading-dark">{name}</h3>
      </Surface>
    </Link>
  );
};
function DAppTitle({
  children,
  instantDapp = false,
  displayText = true,
}: PropsWithChildren<{
  instantDapp?: boolean;
  displayText?: boolean;
}>) {
  return (
    <div className="overflow-hidden [&>*]align-middle line-clamp-1 leading-4 overflow-ellipsis">
      <h3 className="inline heading text-base">{children}</h3>{" "}
      {instantDapp && (
        <>
          <IconLightning className="inline-flex shrink-0 text-primary-container dark:text-primary-container-dark h-3 w-3" />{" "}
          {displayText && (
            <span className="gap-1 text-primary dark:text-primary-dark text-xs font-bold">
              Instant
            </span>
          )}
        </>
      )}
    </div>
  );
}
