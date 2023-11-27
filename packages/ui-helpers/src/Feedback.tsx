import { FeedbackIcon } from "icons";
import Link from "next/link";
import { FEEDBACK_URL } from "constants-helper";

export const Feedback = ({
  handleClick,
  text,
}: {
  handleClick: () => void;
  text: string;
}) => {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={FEEDBACK_URL}
      className="bg-red text-pearl hover:bg-red1 active:bg-red2 fixed -right-[81px] top-1/2 hidden -rotate-90 rounded-tl-lg rounded-tr-lg  font-semibold transition-color duration-200 ease-in-out lg:block "
      onClick={handleClick}
    >
      <div className="flex items-center space-x-2 px-5 py-2">
        <FeedbackIcon className="rotate-90" />
        <span>{text}</span>
      </div>
    </a>
  );
};
