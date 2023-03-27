const RadioElement = ({
  text,
  onChange,
  selected,
  name,
}: {
  text: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  selected: string;
}) => {
  return (
    <div className="px-3 space-x-2 flex items-center bg-white mb-1 text-sm ">
      <input
        className="relative h-5 w-5 rounded-full border-2 cursor-pointer checked:border-red checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:content-['']"
        type="radio"
        value={text}
        name={name}
        checked={selected === text}
        id={text}
        onChange={onChange}
      />
      <label className="w-full p-3 cursor-pointer" htmlFor={text}>
        {text}
      </label>
    </div>
  );
};

export default RadioElement;
