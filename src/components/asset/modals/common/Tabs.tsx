import { useState } from "react";

const Tabs = () => {
  const [selected, setSelected] = useState(false);

  return (
    <div className="flex items-center w-full border border-darkGray1 bg-pearl justify-center rounded font-bold font-[IBM] ">
      <button
        className={`${
          selected ? "text-pearl bg-darkGray1 " : "text-darkGray1"
        }border-r border-darkGray1 w-full h-full px-6 py-2 flex flex-col`}
        onClick={() => {
          if (!selected) {
            setSelected(!selected);
          }
        }}
      >
        <span>ERC-20</span>

        <span className="font-normal text-xs">0.001</span>
      </button>
      <button
        className={`${
          selected ? "text-darkGray1" : "text-pearl bg-darkGray1 "
        }border-r border-darkGray1 w-full h-full px-6 py-2 flex flex-col`}
        onClick={() => {
          if (selected) {
            setSelected(!selected);
          }
        }}
      >
        <span>IBC</span>
        <span className="font-normal text-xs">0.0002</span>
      </button>
    </div>
  );
};

export default Tabs;
