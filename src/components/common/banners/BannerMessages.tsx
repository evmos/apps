// use this if you want to show a loading, error,
// or some message while the data is fetching
const BannerMessages = ({
  text,
  spinner,
  className,
}: {
  text: string;
  spinner?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={`font-bold font-[GreyCliff] text-pearl md:col-span-2 justify-center mx-5 md:mx-0 mb-5 bg-darkGray2 p-5 rounded-2xl text-sm px-5 flex text-center items-center space-x-2 ${
        className !== undefined ? className : ""
      }`}
    >
      {spinner && <span className="loader"></span>}
      <p>{text}</p>
    </div>
  );
};
export default BannerMessages;
