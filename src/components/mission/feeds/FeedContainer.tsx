const FeedContainer = ({ children }: { children: JSX.Element }) => {
  return (
    <section className="p-2 rounded mb-4 border-b border-darkPearl border-opacity-80 pb-5 last:border-b-0 bg-darkGray2 hover:bg-darkGray2Opacity">
      {children}
    </section>
  );
};

export default FeedContainer;
