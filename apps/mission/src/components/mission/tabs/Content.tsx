import Discussions from "./allTabs/Discussions";
import Guides from "./allTabs/Guides";
import News from "./allTabs/News";

export type tabContent = {
  title: string;
  id: string;
  content: JSX.Element | JSX.Element[];
};

export const tabsAnnouncements = [
  {
    title: "News",
    id: "tab1",
    content: <News />,
  },
  {
    title: "Discussions",
    id: "tab2",
    content: <Discussions />,
  },
  {
    title: "Guides",
    id: "tab3",
    content: <Guides />,
  },
];
