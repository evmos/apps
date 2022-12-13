const Container = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="bg-black grid min-h-screen grid-template-[120px]">
      <div className='w-full h-full bg-[url("/stars.svg")] bg-repeat bg-auto bg-bottom'>
        {children}
      </div>
    </div>
  );
};

export default Container;
