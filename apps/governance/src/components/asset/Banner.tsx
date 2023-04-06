import QuestionMarkIcon from "../common/images/icons/QuestionMarkIcon";

const Banner = () => {
  return (
    <div className="bg-pearl text-black rounded-lg p-4 my-4 mx-5 xl:mx-0 flex items-center space-x-1">
      <QuestionMarkIcon />
      <p>
        Welcome to the beta version of the asset page - please note that this is
        a work in progress!
      </p>
    </div>
  );
};

export default Banner;
