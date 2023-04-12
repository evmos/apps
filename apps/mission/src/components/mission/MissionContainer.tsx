const MissionContainer = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <div className=" rounded-2xl bg-darkGray2 p-5 font-[IBM] text-sm text-pearl ">
        {children}
      </div>
    </>
  );
};

export default MissionContainer;
