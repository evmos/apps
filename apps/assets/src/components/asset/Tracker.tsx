import { Tracker } from "tracker";

const MIXPANEL_TOKEN = "e500da502fb6c90194366bbc8ead7c88";
let metrics: Tracker | undefined;
// const mixpanelEnabled = true; // Set this to false to disable Mixpanel tracking
// mixpanelEnabled &&
if (MIXPANEL_TOKEN !== undefined) {
  metrics = new Tracker(MIXPANEL_TOKEN);
  metrics.identify();
}

export default metrics;
