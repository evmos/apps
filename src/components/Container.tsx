const Container = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="bg-black grid min-h-screen grid-template-32">
      <div className='w-full h-full bg-[url("/stars.svg")] bg-repeat bg-auto bg-center px-14 font-[GreyCliff]'>
        {children}
      </div>
    </div>
  );
};

export default Container;
