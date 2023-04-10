import DownArrowHollowIcon from "../../../common/images/icons/DownArrowHollowIcon";

const Arrow = () => {
  return (
    <div className="relative h-5">
      <div className="absolute left-1/2 top-[-10px] z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-[50%] bg-darkGray2 ">
        <DownArrowHollowIcon />
      </div>
    </div>
  );
};

export default Arrow;
