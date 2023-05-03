import { Tracker } from "tracker";

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
let metrics: Tracker | undefined;
console.log(MIXPANEL_TOKEN);
if (MIXPANEL_TOKEN !== undefined) {
  console.log(MIXPANEL_TOKEN);
  metrics = new Tracker(MIXPANEL_TOKEN);
}

export default metrics;
