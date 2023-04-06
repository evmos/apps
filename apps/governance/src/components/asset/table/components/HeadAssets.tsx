const HeadAssets = () => {
  return (
    <div className="hidden lg:flex uppercase w-full font-bold items-center sticky top-0 bg-black">
      <div className="w-[5%]"></div>
      <div className="text-left py-4 space-x-5 w-[50%]">Asset</div>
      <div className="text-right mr-8 lg:mr-0 lg:text-left w-[50%] space-x-5">
        Total Balance
      </div>
    </div>
  );
};

export default HeadAssets;
