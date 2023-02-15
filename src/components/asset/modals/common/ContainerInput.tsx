const ContainerInput = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="pr-5 pl-4 py-2 flex items-center space-x-3 bg-white hover:border-darkGray5 focus-visible:border-darkGray5 focus-within:border-darkGray5 border border-darkGray5 rounded">
      {children}
    </div>
  );
};

export default ContainerInput;
