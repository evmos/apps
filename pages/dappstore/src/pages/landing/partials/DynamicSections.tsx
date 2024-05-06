// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  Category,
  DApp,
  fetchExplorerData,
} from "../../../lib/fetch-explorer-data";
import Image from "next/image";
import {
  Surface,
  SurfaceProps,
} from "@evmosapps/ui/components/surface/index.tsx";
import { Card, CardRanking } from "@evmosapps/ui/components/cards/Card.tsx";
import { Badge } from "@evmosapps/ui/components/badges/Badge.tsx";
import { ScrollableSection } from "../ScrollableSection";
import { Link } from "@evmosapps/i18n/client";
import { BannerCard } from "./banner-card";
import { Button } from "@evmosapps/ui/button/index.tsx";
import { cn } from "helpers/src/classnames";
import { IconLightning } from "@evmosapps/ui/icons/filled/images/lightning.tsx";
import { ComponentProps, PropsWithChildren } from "react";
import { IconButton } from "@evmosapps/ui/button/icon-button.tsx";
import { IconArrowRight } from "@evmosapps/ui/icons/line/arrows/arrow-right.tsx";
import { MaybeImage } from "./MaybeImage";
import {
  fetchPageDynamicSections,
  DynamicSection,
} from "./fetchPageDynamicSections";

export const getDAppsMapByNotionId = async () => {
  const { dApps } = await fetchExplorerData();
  return dApps.reduce<Record<string, DApp>>((acc, dapp) => {
    acc[dapp.id] = dapp;
    return acc;
  }, {});
};
export async function DynamicSections({ placement }: {  placement: string }) {
  const sections = await fetchPageDynamicSections(placement);
  return (
    <div className="flex flex-col gap-y-8">
      {sections.map((section, i) => {
        switch (section.displayType) {
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
          <DAppStorePicks.DAppCard key={dapp.slug} {...dapp} />
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
      <DAppStorePicks.Body>
        {resolvedCategories.map((category) => (
          <DAppStorePicks.CategoryCard key={category.slug} {...category} />
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
        ({ name, icon, categories, categorySlug, slug, instantDapp }, i) => (
          <Link href={`/dapps/${categorySlug}/${slug}`} key={slug}>
            <Surface
              lowest
              className="w-60 flex-none flex flex-col gap-y-2  p-4"
              key={i}
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
      {resolvedDApps.map(({ name, icon, categorySlug, slug, thumbnail }, i) => (
        <Link href={`/dapps/${categorySlug}/${slug}`} key={slug}>
          <Card
            low
            className="bg-cover overflow-hidden flex-col w-60 flex shrink-0"
          >
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
              <div className="w-full flex grow-1 overflow-hidden">
                <h3 className="heading text-base overflow-hidden w-full overflow-ellipsis">
                  {name}
                </h3>
              </div>
            </div>
          </Card>
        </Link>
      ))}
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
  categorySlug,
  categories,
  slug,
}: Pick<DApp, "name" | "icon" | "categorySlug" | "categories" | "slug">) {
  return (
    <Link href={`/dapps/${categorySlug}/${slug}`}>
      <Card
        low
        className="overflow-hidden flex-row shrink-0 gap-4 p-3 w-full hover:bg-surface-container hover:dark:bg-surface-container-dark transition-colors duration-150 items-center group"
      >
        <MaybeImage {...icon} alt={name} width={56} height={56} />
        <div className="">
          <DAppTitle instantDapp={false}>{name}</DAppTitle>
          <div className="gap-1 inline-flex">
            {categories.map((category) => (
              <Badge key={category.slug}> {category.name}</Badge>
            ))}
          </div>
        </div>

        <Button
          as={"span"}
          href={`/dapps/${categorySlug}/${slug}`}
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
const CATEGORY_PROPS: Record<
  string,
  {
    className: string;
    Icon: React.ComponentType;
  }
> = {};
DAppStorePicks.CategoryCard = function DAppStorePicksCategoryCard({
  name,
  slug,
}: Pick<Category, "name" | "slug">) {
  const { Icon, className } = CATEGORY_PROPS[slug] ?? {
    className:
      "bg-primary/10 dark:bg-primary-dark/10 text-primary-container dark:text-primary-container-dark",
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
            className,
          )}
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
}: PropsWithChildren<{
  instantDapp?: boolean;
}>) {
  return (
    <div className="overflow-hidden [&>*]align-middle line-clamp-1 leading-4 overflow-ellipsis">
      <h3 className="inline heading text-base">{children}</h3>{" "}
      {instantDapp && (
        <>
          <IconLightning className="inline-flex shrink-0 text-primary-container dark:text-primary-container-dark h-3 w-3" />{" "}
          <span className="gap-1 text-primary dark:text-primary-dark text-xs font-bold">
            Instant
          </span>
        </>
      )}
    </div>
  );
}
