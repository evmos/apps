import { truncateAddress } from "../../../../internal/wallet/style/format";
import MetamaskIcon from "../../../common/images/icons/MetamaskIcon";

const FromContainer = ({
  token,
  address,
  amount,
}: {
  token: string;
  address: string;
  amount: number;
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-10">
          <span className="font-bold">FROM</span>
          <div className="flex items-center space-x-3">
            <MetamaskIcon />
            <span className="font-bold">{token}</span>
          </div>
        </div>
        {address && (
          <span className="opacity-80">{truncateAddress(address)}</span>
        )}
      </div>
      <div className="pr-5 pl-2 flex items-center space-x-3 bg-white hover:border-black focus-visible:border-black focus-within:border-black border border-darkGray5 rounded-lg">
        <input
          className="w-full p-3 border-none hover:border-none focus-visible:outline-none"
          type="number"
        />
        <span className="opacity-80">{token}</span>
        <button className="border border-black rounded-lg px-2 py-1 opacity-80 font-bold text-black">
          MAX
        </button>
      </div>
      <div>
        <span className="font-bold">Balance: </span>
        {amount} {token}
      </div>
    </>
  );
};

export default FromContainer;
