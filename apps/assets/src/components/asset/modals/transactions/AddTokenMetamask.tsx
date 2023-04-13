import Image from "next/image";
import { useDispatch } from "react-redux";
import { SmallButton } from "small-button";
import {
  addToken,
  Token,
  addSnackbar,
  SNACKBAR_CONTENT_TYPES,
} from "evmos-wallet";

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
          content: {
            type: SNACKBAR_CONTENT_TYPES.TEXT,
            title: value.text,
          },
          type: value.type,
        })
      );
    }
  };
  return (
    <SmallButton
      onClick={handleOnClick}
      text={
        <div className="flex items-center space-x-1 uppercase">
          <Image
            width={15}
            height={15}
            className="w-auto cursor-pointer"
            src={`/assets/tokens/${token.symbol.toLowerCase()}.png`}
            alt={token.symbol}
          />
          <span>Add {token.symbol}</span>
        </div>
      }
    />
  );
};

export default AddTokenMetamask;
