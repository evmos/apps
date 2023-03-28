import Latest from "./allTabs/Latest";
import System from "./allTabs/System";

export type tabContent = {
  title: string;
  id: string;
  content: JSX.Element | JSX.Element[];
};

export const tabsAnnouncements = [
  {
    title: "Latest",
    id: "tab1",
    content: <Latest />,
  },
  {
    title: "System",
    id: "tab2",
    content: <System />,
  },
  {
    title: "News",
    id: "tab3",
    content: <p>news</p>,
  },
];
