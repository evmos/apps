import { useDispatch } from "react-redux";
import {
  addToken,
  Token,
} from "../../../../internal/wallet/functionality/metamask/metamaskHelpers";
import MetamaskIcon from "../../../common/images/icons/MetamaskIcon";
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
      className="flex items-center border border-darkGray2 rounded-lg p-1 px-3 text-xs uppercase space-x-2 font-bold"
      onClick={handleOnClick}
    >
      <MetamaskIcon width={20} height={20} className="cursor-pointer" />
      Add {token.symbol}
    </button>
  );
};

export default AddTokenMetamask;
