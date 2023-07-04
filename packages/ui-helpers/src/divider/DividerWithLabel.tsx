export const DividerWithLabel = ({ label }: { label: string }) => {
  return (
    <div className="relative ">
      <div
        className="bg-red-600 absolute right-0 top-1/2 left-1/2 flex w-20 -translate-x-1/2 -translate-y-1/2 transform items-center"
        aria-hidden="true"
      >
        <div className="w-full border-t border-[#D1D5DB]" />
      </div>
      <div className="relative flex justify-center ">
        <span className="text-gray-500 bg-white px-2 text-sm ">{label}</span>
      </div>
    </div>
  );
};
