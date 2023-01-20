import Link from "next/link";
import QuestionMarkIcon from "../common/images/icons/QuestionMarkIcon";

const Banner = () => {
  return (
    <div className="bg-pearl text-black rounded-lg p-4 my-4 mx-5 xl:mx-0 flex items-center space-x-1">
      <QuestionMarkIcon />
      <p>
        Welcome to the new asset page! If you want to go back to the Mission
        Control, please click
      </p>
      <Link href="https://app.evmos.org" className="text-red">
        here
      </Link>
    </div>
  );
};

export default Banner;
