const TopBarContainer = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <div className="mx-5 xl:mx-0 mb-5 bg-darkGray2 p-5 rounded-2xl font-[IBM] text-sm px-5 text-pearl grid grid-cols-[repeat(auto-fit,186px)] gap-3 text-center items-center justify-center md:justify-between">
        {children}
      </div>
    </>
  );
};

export default TopBarContainer;
