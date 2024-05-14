// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { fetchSearchableItems } from "./fetchSearchableItems";
import { MaybeImage } from "@evmosapps/ui/headless/maybe-image.tsx";
import { IconSearch } from "@evmosapps/ui/icons/line/basic/search.tsx";
import flexsearch from "flexsearch";
import { memoize } from "lodash-es";
import { useQuery } from "@tanstack/react-query";
import { IconLightning } from "@evmosapps/ui/icons/filled/images/lightning.tsx";
import { useTranslation } from "@evmosapps/i18n/client";
const { Index } = flexsearch;

const fetchEntries = memoize(fetchSearchableItems);
const getIndexedEntries = memoize(async () => {
  const { entries } = await fetchEntries();
  const index = new Index({
    tokenize: "full",
    charset: "latin:advanced",
  });
  entries.forEach((entry, i) => {
    const context = [entry.name];
    if (entry.instantDapp) {
      context.push("instantdApp");
    }
    context.push(...entry.categories.map((c) => c.name));

    index.add(i, context.join(" "));
  });
  return { entries, index };
});

function* iterHighlightRegions(query: string, text: string) {
  let i = 0;
  const reg = new RegExp(query, "gi");
  for (const match of text.matchAll(reg)) {
    const str = match[0];
    const index = match.index;
    const pre = text.slice(i, index);

    if (pre) {
      yield { match: false, text: pre };
    }

    yield { match: true, text: str };
    i = index + str.length;
  }

  const post = text.slice(i);
  if (post) {
    yield { match: false, text: post };
  }
}
export const SearchResults = ({ query }: { query: string }) => {
  const { t } = useTranslation("dappSearch");
  const search = useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      if (!query) {
        const { entries, trending } = await fetchEntries();
        const entriesBySlug = entries.reduce<
          Record<string, (typeof entries)[0]>
        >((acc, entry) => {
          acc[entry.slug] = entry;
          return acc;
        }, {});
        return trending.flatMap((slug) => {
          const entry = entriesBySlug[slug];
          return entry ? [entry] : [];
        });
      }
      const { index, entries } = await getIndexedEntries();
      const results = index.search(query, { limit: 10 });
      return results.map((i) => entries.at(i as number)!);
    },
  });
  const results = search.data ?? [];

  return (
    <ComboboxOptions className="py-4 h-full md:h-[464px] md:overflow-y-auto md:px-2 md:py-2 md:border-t md:dark:border-surface-container-high-dark md:border-surface-container-high">
      {query && !results.length && !search.isFetching && (
        <div className="text-center flex flex-col items-center pt-20">
          <IconSearch />
          <h2 className="text-heading dark:text-heading-dark mt-6">
            {t("noResults.title")}
          </h2>
          <p>{t("noResults.description")}</p>
        </div>
      )}
      {!!results.length && (
        <h2 className="py-3 px-3 text-heading dark:text-heading-dark">
          {query ? "Best matches" : "Trending"}
        </h2>
      )}
      {results.map((entry) => (
        <ComboboxOption
          key={entry.slug}
          value={entry}
          className="data-[focus]:dark:bg-surface-container-high-dark data-[focus]:bg-surface-container-high flex gap-4 py-3 px-3 items-center rounded-md cursor-pointer"
        >
          <MaybeImage
            {...entry.icon}
            width={16}
            height={16}
            className="flex-none w-4 h-4 rounded-[4px] items-center"
            alt={entry.name}
          />
          <h2>
            {Array.from(iterHighlightRegions(query, entry.name)).map(
              ({ match, text }, i) =>
                match ? (
                  <mark
                    key={i}
                    className="text-primary dark:text-primary-dark bg-transparent font-bold"
                  >
                    {text}
                  </mark>
                ) : (
                  <span key={i}>{text}</span>
                ),
            )}
          </h2>
          {entry.instantDapp && (
            <span>
              <IconLightning className="inline-flex shrink-0 text-primary-container dark:text-primary-container-dark h-3 w-3" />{" "}
              <span className="gap-1 text-primary dark:text-primary-dark text-xs font-bold">
                Instant
              </span>
            </span>
          )}
        </ComboboxOption>
      ))}
    </ComboboxOptions>
  );
};
