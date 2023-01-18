import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  addToken,
  Token,
} from "../../../../internal/wallet/functionality/metamask/metamaskHelpers";
import { addSnackbar } from "../../../notification/redux/notificationSlice";

const AddTokenMetamask = ({ token }: { token: Token }) => {
  const dispatch = useDispatch();

  const handleOnClick = async () => {
    const value = await addToken({
      erc20Address: token.erc20Address,
      symbol: token.symbol,
      decimals: token.decimals,
      img: token.img,
    });
    if (value !== undefined) {
      dispatch(
        addSnackbar({
          id: 0,
          content: value.text,
          type: value.type,
        })
      );
    }
  };
  return (
    <button
      className="flex items-center border border-darkGray2 rounded p-1 text-xs uppercase space-x-1 font-bold"
      onClick={handleOnClick}
    >
      <Image
        width={15}
        height={15}
        className="cursor-pointer"
        src={`/tokens/${token.symbol.toLowerCase()}.png`}
        alt={token.symbol}
      />
      <span>Add {token.symbol}</span>
    </button>
  );
};

export default AddTokenMetamask;
