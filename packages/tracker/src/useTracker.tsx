import { Dict } from "mixpanel-browser";
import { useMixpanel } from "./context/mixpanel";

export const useTracker = (event: string, properties?: Dict) => {
  const mixpanel = useMixpanel();

  const handlePreClickAction = (extraProperties?: Dict) => {
    if (
      mixpanel !== null &&
      Object.prototype.hasOwnProperty.call(mixpanel, "get_config")
    ) {
      mixpanel.track(event, { ...properties, ...extraProperties });
    }
  };

  return {
    handlePreClickAction,
  };
};
