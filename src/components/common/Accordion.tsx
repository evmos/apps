import { useState } from "react";
import DownArrowIcon from "./images/icons/DownArrow";
import UpArrowIcon from "./images/icons/UpArrow";

const Accordion = ({
  title,
  content,
  className,
}: {
  title: JSX.Element;
  content: JSX.Element | string;
  className: string;
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion">
      <div
        className={`${className} bg-darkGray2 border-b-2 border-b-black py-5 accordion-item`}
      >
        <div
          className={`flex items-center ${
            content !== "" ? "cursor-pointer" : "cursor-default"
          } `}
          onClick={() => setIsActive(!isActive)}
        >
          <div className="w-[5%] flex justify-center">
            {content !== "" ? (
              isActive ? (
                <UpArrowIcon />
              ) : (
                <DownArrowIcon />
              )
            ) : (
              ""
            )}
          </div>
          {title}
        </div>
        {content !== "" && isActive && (
          <div className="border-t-2 border-t-black pt-5 mt-5 flex ">
            <div className="flex justify-between w-full">{content}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
