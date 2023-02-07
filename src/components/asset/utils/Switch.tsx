const Switch = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <div className="items-center mt-3 xl:mt-0 flex justify-center">
      <label className="inline-flex relative items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={onChange}
          checked={checked}
        />
        <div className="w-10 h-4 rounded-full text-white bg-darkGray3 peer-checked:after:translate-x-full peer-checked:after:border-red peer-checked:after:bg-red after:content-[''] after:absolute after:top-[0px] after:left-[1px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-darkGray3"></div>
        <span className="ml-3 text-sm font-medium text-white">
          Hide Zero Balance
        </span>
      </label>
    </div>
  );
};
export default Switch;
