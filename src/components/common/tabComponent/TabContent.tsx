const TabContent = ({
  id,
  activeTab,
  children,
}: {
  id: string;
  activeTab: string;
  children: JSX.Element;
}) => {
  return activeTab === id ? <div className="">{children}</div> : null;
};

export default TabContent;
