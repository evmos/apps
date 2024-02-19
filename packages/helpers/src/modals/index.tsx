// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import qs, { ParsedUrlQueryInput } from "querystring";
import { useMemo, SetStateAction, useEffect, useRef } from "react";
import { z } from "zod";
import { useEffectEvent } from "../hooks/use-effect-event";
import React from "react";

import { useSearchParams, useRouter } from "next/navigation";

import { get } from "lodash-es";

const serialize = <T extends z.output<z.AnyZodObject>>(obj: T) => {
  return JSON.stringify(obj, (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value as unknown;
  });
};

const sanitize = (obj: z.output<z.AnyZodObject>) => {
  return JSON.parse(serialize(obj)) as ParsedUrlQueryInput;
};

const usePrevious = <T,>(value: T) => {
  const ref = useRef<T>(value);
  useEffect(() => {
    return () => {
      ref.current = value;
    };
  }, [value]);
  return ref.current;
};

/**
 * Hook to manage modals
 *
 * State is managed in the URL query params
 * @param id Unique ID for the modal
 * @param schema Zod schema to define and validate the state
 *
 */
export const useModal = <T extends z.AnyZodObject>(
  id: string,
  schema: T = z.object({}) as T,
) => {
  const safeParse: T["safeParse"] = useEffectEvent(schema.safeParse);
  const { push, replace } = useRouter();
  const searchParams = useSearchParams().toString();

  const query = useMemo(() => {
    return qs.decode(searchParams);
  }, [searchParams]);

  const prevAction = usePrevious(query?.action);

  const routeTo = prevAction !== query.action ? push : replace;

  const state: z.output<T> | null = useMemo(() => {
    const parsed = safeParse(query);
    if (parsed.success) return parsed.data;
    return null;
  }, [query, safeParse]);
  const isOpen = !!(query.action === id && state);

  const setState = useEffectEvent((next: SetStateAction<z.output<T>>) => {
    if (!isOpen) throw new Error("You can't set state on a closed modal");

    const nextState = typeof next === "function" ? next(state) : next;
    const url = new URL(window.location.href);

    const newParams = new URLSearchParams(
      qs.stringify({
        action: id,
        ...sanitize(nextState),
      }),
    );
    for (const [key, value] of newParams) {
      url.searchParams.set(key, value);
    }
    if (searchParams === url.searchParams.toString()) {
      return;
    }

    routeTo(url.toString(), { scroll: false });
  });

  const setIsOpen = useEffectEvent(
    (
      open: SetStateAction<boolean>,
      initialState: z.output<T> = {},
      redirectBack = false,
    ) => {
      const nextOpenState = typeof open === "function" ? open(isOpen) : open;

      if (nextOpenState === isOpen) return;
      if (nextOpenState) {
        const next = safeParse(initialState);

        if (next.success) {
          const url = new URL(window.location.href);
          url.searchParams.set("action", id);

          for (const [key, value] of Object.entries(next.data)) {
            url.searchParams.set(key, value as string);
          }

          if (redirectBack && typeof query.action === "string") {
            const redirect = window.location.href;
            url.searchParams.set("redirect", redirect);
          }
          push(url.toString(), { scroll: false });
        }
        return;
      }

      const url = new URL(window.location.href);
      url.searchParams.delete("action");
      if (typeof state === "object" && state !== null) {
        for (const [key, value] of Object.entries(state)) {
          url.searchParams.delete(key, value as string);
        }
      }
      // url.search = "";
      if (typeof query.redirect === "string") {
        push(query.redirect, { scroll: false });
        return;
      }
      push(url.toString(), { scroll: false });
    },
  );

  if (query.action !== id || !state) {
    return {
      isOpen: false,
      setState: () => {},
      setIsOpen,
      modalProps: null,
    } as const;
  }

  return {
    isOpen: true,
    setState,
    setIsOpen,
    modalProps: {
      ...state,
      setState,
      setIsOpen,
    },
  } as const;
};

type ModalLinkProps<T extends z.AnyZodObject> = {
  initialState?:
    | z.output<T>
    | (() => z.output<T>)
    | (() => Promise<z.output<T>>);
  redirectBack?: boolean;
  children: React.ReactElement; // forcing a single child
};
export const modalLink = <T extends z.AnyZodObject>(
  id: string,
  schema: T = z.object({}) as T,
) =>
  function ModalLink({ initialState, children }: ModalLinkProps<T>) {
    const { push } = useRouter();
    const onClick = async () => {
      const state =
        (initialState instanceof Function
          ? await initialState()
          : initialState) ?? {};
      schema.parse(state);
      const url = new URL(window.location.href);

      const searchParams = new URLSearchParams(
        qs.stringify({
          action: id,
          ...sanitize(state),
        }),
      );

      for (const [key, value] of searchParams) {
        url.searchParams.set(key, value);
      }
      push(url.toString(), {
        scroll: false,
      });
    };
    return React.cloneElement(children, {
      onClick: (e: React.MouseEvent) => {
        const childOnClick: unknown = get(children, "props.onClick");
        if (typeof childOnClick === "function") {
          childOnClick(e);
        }

        void onClick();
      },
    });
  };

export type ModalProps<T extends z.AnyZodObject> = NonNullable<
  ReturnType<typeof useModal<T>>["modalProps"]
>;
