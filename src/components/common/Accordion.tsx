import { useState } from "react";
import DownArrowIcon from "./images/icons/DownArrow";
import UpArrowIcon from "./images/icons/UpArrow";

const Accordion = ({
  title,
  content,
}: {
  title: JSX.Element;
  content: JSX.Element | null;
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion">
      <div className="bg-darkGray2 border-b-2 border-b-black py-5 accordion-item">
        <div
          className={`flex items-center ${
            content !== null ? "cursor-pointer" : "cursor-default"
          } `}
          onClick={() => setIsActive(!isActive)}
        >
          <div className="w-[5%] flex justify-center mx-4 lg:mx-0">
            {content !== null ? (
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
        {content !== null && isActive && (
          <div className="border-t-2 border-t-darkGray3 pt-5 mt-5 flex ">
            <div className="flex justify-between w-full">{content}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
