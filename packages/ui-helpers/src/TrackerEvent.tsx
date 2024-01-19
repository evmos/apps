// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { Dict } from "mixpanel-browser";
import React from "react";
import { TrackerEvents, sendEvent } from "tracker";
import { get } from "lodash-es";
import { isCallable } from "helpers";
export const TrackerEvent = ({
  event,
  properties,
  children,
}: {
  children: React.ReactElement; // forcing a single child
  event: TrackerEvents;
  properties?: Dict | (() => Dict) | (() => Promise<Dict>);
}) => {
  return React.cloneElement(children, {
    onClick: async (e: React.MouseEvent) => {
      const childOnClick: unknown = get(children, "props.onClick");
      if (childOnClick instanceof Function) childOnClick(e);
      if (isCallable(properties)) {
        const _properties = (await properties()) as Dict;
        sendEvent(event, _properties);
        return;
      }
      sendEvent(event, properties);
    },
  });
};
