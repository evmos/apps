import mixpanel from "mixpanel-browser";

import { Provider } from "./context/mixpanel";

const defaults = {
  track_pageview: false, // Rarely makes sense to track page views in React apps
};

export const MixpanelProvider = ({
  children,
  config,
  //   name,
  token = "",
}: {
  children: JSX.Element;
  config: any;
  //   name: string;
  token: string;
}) => {
  config = Object.assign({}, defaults, config);

  mixpanel.init(token, config);
  //   || process.env.REACT_APP_MIXPANEL_TOKEN

  return <Provider value={mixpanel}>{children}</Provider>;
};
