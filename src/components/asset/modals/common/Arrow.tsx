import DownArrowHollowIcon from "../../../common/images/icons/DownArrowHollowIcon";

const Arrow = () => {
  return (
    <div className="relative h-8">
      <div className="border w-14 h-14 border-pearl bg-darkGray2 rounded-[50%] flex items-center justify-center z-10 absolute left-1/2 top-[-10px] -translate-x-1/2 ">
        <DownArrowHollowIcon />
      </div>
    </div>
  );
};

export default Arrow;
