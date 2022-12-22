const Container = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="bg-black grid min-h-screen">
      <div className='w-full h-full bg-[url("/stars.svg")] bg-repeat bg-auto bg-center px-5 md:px-14 font-[GreyCliff] overflow-auto flex flex-col'>
        {children}
      </div>
    </div>
  );
};

export default Container;
