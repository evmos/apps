"use server";

export const AppsExplorerLayout = ({ children }: React.PropsWithChildren) => {
  return <div className="flex flex-col space-y-8">{children}</div>;
};
