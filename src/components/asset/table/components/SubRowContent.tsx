import { useSelector } from "react-redux";
import {
  amountToDolars,
  convertAndFormat,
} from "../../../../internal/asset/style/format";
import { EVMOS_SYMBOL } from "../../../../internal/wallet/functionality/networkConfig";
import { KEPLR_KEY } from "../../../../internal/wallet/functionality/wallet";
import { StoreType } from "../../../../redux/Store";
import Button from "../../../common/Button";
import { ConvertSTR } from "../../modals/transactions/ConvertSTR";
import { Description } from "./Description";
import { SubRowProps } from "./types";

export const SubRowContent = ({
  item,
  setShow,
  setModalContent,
  isIBCBalance = false,
  feeBalance,
}: SubRowProps) => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);

  let balance = item.erc20Balance;
  let symbol = item.symbol;
  if (isIBCBalance) {
    balance = item.cosmosBalance;
  } else {
    if (item.symbol === EVMOS_SYMBOL) {
      symbol = "WEVMOS";
    }
  }

  const openModalConvert = () => {
    setShow(true);
    setModalContent(
      <ConvertSTR
        item={item}
        address={wallet.evmosAddressCosmosFormat}
        setShow={setShow}
        isIBCBalance={isIBCBalance}
        feeBalance={feeBalance}
      />
    );
  };
  return (
    <div className="flex w-full">
      <div className="w-[5%]"></div>
      <Description
        symbol={symbol}
        description={item.description}
        subRow={true}
      />
      <div className="flex items-center uppercase w-[50%]">
        <div className="flex flex-col">
          <span className="font-bold">
            {convertAndFormat(balance, item.decimals)}
          </span>
          <span className="text-sm text-darkGray5">
            {amountToDolars(balance, item.decimals, item.coingeckoPrice)}
          </span>
        </div>
        {item.symbol === EVMOS_SYMBOL && (
          <div className="justify-end w-full flex pr-8">
            <Button
              disabled={
                !wallet.active ||
                (wallet.extensionName === KEPLR_KEY &&
                  item.symbol === EVMOS_SYMBOL)
              }
              onClick={openModalConvert}
            >
              <div className="flex flex-row items-center">
                <span className="px-2">Convert</span>
              </div>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
