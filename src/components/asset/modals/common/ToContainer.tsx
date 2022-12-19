import Image from "next/image";
import MetamaskIcon from "../../../common/images/icons/MetamaskIcon";

const ToContainer = ({
  token,
  img,
  text,
}: {
  token: string;
  img: string;
  text?: string;
}) => {
  return (
    <>
      <div className="flex items-center space-x-10">
        <span className="font-bold">TO</span>
        <div className="flex items-center space-x-3">
          <Image src={img} width={20} height={20} alt={img} />
          <span className="font-bold">{text ? text : token}</span>
        </div>
      </div>
      <button className="text-xs py-1 font-bold flex items-center border border-red text-darkGray4 bg-pearl rounded-md px-3 space-x-2">
        <MetamaskIcon width={15} height={15} />
        <span className="uppercase ">add {token}</span>
      </button>
    </>
  );
};

export default ToContainer;
