const MissionContainer = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <div className=" bg-darkGray2 p-5 rounded-2xl font-[IBM] text-sm text-white ">
        {children}
      </div>
    </>
  );
};

export default MissionContainer;
