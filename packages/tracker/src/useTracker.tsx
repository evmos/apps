import { useMixpanel } from "./context/mixpanel";

export interface Dict {
  [key: string]: any;
}

export const useTracker = (event: string, properties?: Dict) => {
  const mixpanel = useMixpanel();

  const handlePreClickAction = () => {
    // TODO: remove this @ts-ignore: Unreachable code error
    // @ts-ignore: Unreachable code error
    if (mixpanel.config.token) {
      // Check that a token was provided (useful if you have environments without Mixpanel)
      // TODO: remove this @ts-ignore: Unreachable code error
      // @ts-ignore: Unreachable code error
      mixpanel.track(event, properties);
    }
    return;
  };

  return {
    handlePreClickAction,
  };
};
