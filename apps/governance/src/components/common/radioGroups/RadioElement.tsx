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
    <div className="mb-1 flex items-center space-x-2 bg-white px-3 text-sm ">
      <input
        className="relative h-5 w-5 cursor-pointer rounded-full border-2 checked:border-red checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:content-['']"
        type="radio"
        value={text}
        name={name}
        checked={selected === text}
        id={text}
        onChange={onChange}
      />
      <label className="w-full cursor-pointer p-3" htmlFor={text}>
        {text}
      </label>
    </div>
  );
};

export default RadioElement;
