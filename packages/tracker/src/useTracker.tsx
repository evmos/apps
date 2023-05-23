import { Dict } from "mixpanel-browser";
import { useMixpanel } from "./context/mixpanel";

export const useTracker = (event: string, properties?: Dict) => {
  const mixpanel = useMixpanel();

  const handlePreClickAction = (extraProperties?: Dict) => {
    // if mixpanel is not set, config will not exist. Avoid undefined error adding ?
    if (
      mixpanel?.get_config("token") &&
      (localStorage.getItem("disableTracker") === null ||
        localStorage.getItem("disableTracker") === "false")
    ) {
      // Check that a token was provided (useful if you have environments without Mixpanel)
      mixpanel?.track(event, { ...properties, ...extraProperties });
    }
  };

  const disableMixpanel = () => {
    localStorage.setItem("disableTracker", "true");
  };

  const enableMixpanel = () => {
    localStorage.setItem("disableTracker", "false");
  };

  return {
    handlePreClickAction,
    disableMixpanel,
    enableMixpanel,
  };
};
