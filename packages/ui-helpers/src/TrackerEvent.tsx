"use client";
import { Dict } from "mixpanel-browser";
import React from "react";
import { TrackerEvents, sendEvent } from "tracker";

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
      if (children.props.onClick) children.props.onClick(e);
      if (typeof properties === "function") {
        sendEvent(event, await properties());
        return;
      }
      sendEvent(event, properties);
    },
  });
};
