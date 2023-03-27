const MissionContainer = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="bg-black grid min-h-screen min-w-[300px]">
      <div className='w-full h-full bg-[url("/stars.svg")] bg-repeat bg-auto bg-center px-4  font-[GreyCliff] overflow-auto flex flex-col'>
        {children}
      </div>
    </div>
  );
};

export default MissionContainer;
