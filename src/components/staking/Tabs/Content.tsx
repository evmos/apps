import dynamic from "next/dynamic";
const Validators = dynamic(() => import("../AllTabs/Validators"));
const Undelegations = dynamic(() => import("../AllTabs/Undelegations"));
const Delegations = dynamic(() => import("../AllTabs/Delegations"));

export type tabContent = {
  title: string;
  id: string;
  content: JSX.Element;
};

export const tabsContent = [
  {
    title: "staking",
    id: "tab1",
    content: <Delegations />,
  },
  {
    title: "validators",
    id: "tab2",
    content: <Validators />,
  },
  {
    title: "pending",
    id: "tab3",
    content: <Undelegations />,
  },
];
