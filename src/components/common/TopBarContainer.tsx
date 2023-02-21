const TopBarContainer = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <div className="mx-5 xl:mx-0 mb-5 bg-darkGray2 p-5 rounded-2xl font-[IBM] text-sm px-5 text-white grid grid-flow-row lg:grid-flow-col auto-rows-fr space-y-2 sm:space-y-0 text-center items-center">
        {children}
      </div>
    </>
  );
};

export default TopBarContainer;
