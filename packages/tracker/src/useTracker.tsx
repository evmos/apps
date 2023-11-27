import mixpanel, { Dict } from "mixpanel-browser";
import * as events from "./events";
export type TrackerEvents = (typeof events)[keyof typeof events];
import { DISABLE_TRACKER_LOCALSTORAGE } from "./constants";
import { Log, useEffectEvent } from "helpers";
import { useMemo } from "react";

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ?? "", {
  ip: false,
});

export const isTrackerEnabled = () => {
  return !JSON.parse(
    localStorage.getItem(DISABLE_TRACKER_LOCALSTORAGE) || "true"
  );
};
export const sendEvent = (
  trackingID: TrackerEvents,
  extraProperties?: Dict
) => {
  const mixpanelIsActive = "config" in mixpanel && isTrackerEnabled();
  Log().table({
    ["Tracking ID"]: trackingID,
    ["Extra Properties"]: JSON.stringify(extraProperties, null, 2),
    ["Mixpanel is active"]: mixpanelIsActive,
  });

  if (mixpanelIsActive) mixpanel.track(trackingID, { ...extraProperties });
};
export const disableMixpanel = () => {
  localStorage.setItem(DISABLE_TRACKER_LOCALSTORAGE, "true");
};

export const enableMixpanel = () => {
  localStorage.setItem(DISABLE_TRACKER_LOCALSTORAGE, "false");
};

export const useTracker = (event?: TrackerEvents, properties?: Dict) => {
  const handlePreClickAction = useEffectEvent((extraProperties?: Dict) => {
    if (event === undefined) return;
    sendEvent(event, { ...properties, ...extraProperties });
  });

  return useMemo(
    () => ({
      handlePreClickAction,
      disableMixpanel,
      enableMixpanel,
      sendEvent,
    }),
    []
  );
};
