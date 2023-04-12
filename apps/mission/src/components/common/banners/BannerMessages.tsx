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
      className={`mx-5 mb-5 flex items-center justify-center space-x-2 rounded-2xl bg-darkGray2 p-5 px-5 text-center font-[GreyCliff] text-sm font-bold text-pearl md:col-span-2 md:mx-0 ${
        className !== undefined ? className : ""
      }`}
    >
      {spinner && <span className="loader"></span>}
      <p>{text}</p>
    </div>
  );
};
export default BannerMessages;
