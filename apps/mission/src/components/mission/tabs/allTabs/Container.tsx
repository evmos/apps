const Container = ({ children }: { children: JSX.Element }) => {
  return <div className="max-h-72 overflow-y-auto">{children}</div>;
};

export default Container;
