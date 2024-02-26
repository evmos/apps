import React, { useState } from "react";
import Image from "next/image";

const Tfm = () => {
  const [height, setHeight] = useState<number>(540);
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleHeight = () => {
    if (expanded) {
      setHeight(540);
    } else {
      setHeight(760);
    }
    setExpanded(!expanded);
  };

  return (
    <div
      style={{ height: `${height}px` }}
      data-testid="tfm-widget"
      className="w-full h-[760px] max-w-[660px] flex justify-center items-center flex-col"
    >
      <iframe
        style={{
          height: "100%",
          width: "100%",
          border: "none",
          paddingLeft: "5.6%",
          paddingRight: "5.6%",
          borderRadius: "15px",
          marginTop: "10px",
        }}
        src={`https://widget.tfm.com/`}
      ></iframe>
      <button
        onClick={toggleHeight}
        className="mt-2 h-8 w-10 transtion-all bg-darkGray700 rounded-full duration-200 ease-in-out hover:bg-[#534d46] active:bg-[#666059] flex items-center justify-center"
      >
        {expanded ? (
          <Image
            className="pb-1"
            src={"/arrow-up.png"}
            alt="Reset"
            width={16}
            height={16}
          />
        ) : (
          <Image
            className="pt-1"
            src={"/arrow-down.png"}
            alt="Expand"
            width={16}
            height={16}
          />
        )}
      </button>
    </div>
  );
};

export default Tfm;
