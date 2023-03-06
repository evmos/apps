import Delegations from "../AllTabs/Delegations";
import Undelegations from "../AllTabs/Undelegations";
import Validators from "../AllTabs/Validators";

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
