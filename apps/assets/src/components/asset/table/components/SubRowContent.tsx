import { BigNumber } from "ethers";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  amountToDollars,
  convertAndFormat,
} from "../../../../internal/asset/style/format";
import { BIG_ZERO } from "../../../../internal/common/math/Bignumbers";
import {
  snackWarningLedger,
  EVMOS_SYMBOL,
  KEPLR_KEY,
  StoreType,
} from "evmos-wallet";
import Button from "../../../common/Button";
import QuestionMarkIcon from "../../../common/images/icons/QuestionMarkIcon";
import Tooltip from "../../../common/Tooltip";
import Convert from "../../modals/transactions/Convert";
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
  const dispatch = useDispatch();

  let balance = item.erc20Balance;
  let symbol = item.symbol;
  let description = item.description;

  if (isIBCBalance) {
    balance = item.cosmosBalance;
  } else {
    if (item.symbol === EVMOS_SYMBOL) {
      symbol = "WEVMOS";
      description = "Wrapped EVMOS";
    }
  }

  const openModalConvertEvmos = () => {
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

  const openModalConvert = () => {
    if (wallet.evmosAddressCosmosFormat !== "") {
      setShow(true);
      setModalContent(
        <Convert
          item={item}
          feeBalance={feeBalance}
          address={wallet.evmosAddressCosmosFormat}
          setShow={setShow}
        />
      );
    } else {
      dispatch(snackWarningLedger());
    }
  };

  const createEvmosConvertButton = () => {
    let label = "Convert";
    if (symbol === "EVMOS") {
      label = "WRAP";
    } else if (symbol === "WEVMOS") {
      label = "UNWRAP";
    }

    return (
      <div className="flex w-full justify-end pr-8">
        <Button
          disabled={
            !wallet.active ||
            (wallet.extensionName === KEPLR_KEY && item.symbol === EVMOS_SYMBOL)
          }
          onClick={openModalConvertEvmos}
        >
          <div className="flex w-16 flex-row items-center justify-center">
            <span className="px-2">{label}</span>
          </div>
        </Button>
      </div>
    );
  };

  const createConvertButton = () => {
    return (
      <div className="flex w-full justify-end pr-8">
        <Button onClick={openModalConvert}>
          <div className="flex flex-row items-center">
            <span className="px-2">Convert</span>
          </div>
        </Button>
      </div>
    );
  };

  const createV10Tooltip = () => {
    return (
      <div
        className={`text-xs capitalize ${
          item.cosmosBalance.eq(BigNumber.from("0")) ||
          item.symbol === EVMOS_SYMBOL
            ? "hidden"
            : ""
        }`}
      >
        <Tooltip
          className="w-24"
          element={<QuestionMarkIcon width={16} height={16} />}
          text={
            <>
              Since{" "}
              <Link
                className="text-red"
                href={v10Link}
                rel="noopener noreferrer"
                target="_blank"
              >
                v10
              </Link>{" "}
              upgrade, all withdraws will pull first from IBC token balance
              before ERC-20. Deposits are autoconverted to ERC-20
            </>
          }
        />
      </div>
    );
  };
  const v10Link =
    "https://commonwealth.im/evmos/discussion/8501-evmos-software-upgrade-v10";
  return (
    <div className="mr-8 flex w-full flex-col lg:mr-0 lg:flex-row">
      <div className="md:w-[5%]"></div>
      {/* symbol - token name - description */}
      <div className="hidden w-[50%] lg:flex">
        <Description symbol={symbol} description={description} subRow={true} />
      </div>
      {/* mobile view for description and convert */}
      <div className="flex items-center lg:hidden">
        <Description symbol={symbol} description={description} subRow={true} />

        {item.symbol === EVMOS_SYMBOL && createEvmosConvertButton()}
        {item.symbol !== EVMOS_SYMBOL &&
          !item.cosmosBalance.eq(BIG_ZERO) &&
          createConvertButton()}
      </div>
      <div className="mt-2 flex w-full pl-4 text-right uppercase lg:mt-0 lg:w-[50%] lg:items-center lg:pl-0 lg:text-left">
        <div className=" mx-2.5 lg:mx-0"></div>
        {/* md:w-[5%] */}
        <p className="w-full text-left text-sm capitalize text-darkGray5 lg:hidden ">
          Total Balance
        </p>

        <div className="mr-8 flex w-full flex-col lg:mr-0">
          {/* displays erc20 balance */}
          <span className="break-all text-sm font-bold">
            {convertAndFormat(balance, item.decimals)}
          </span>
          {/* displays ibc balance */}
          <div
            className={` ${
              item.cosmosBalance.eq(BigNumber.from("0")) ||
              item.symbol === EVMOS_SYMBOL
                ? "hidden"
                : ""
            } flex items-center justify-end font-bold lg:justify-start `}
          >
            <div className="block pr-1 lg:hidden">{createV10Tooltip()}</div>
            <Tooltip
              className="capitalize"
              element={
                <p className="break-all text-sm opacity-80">
                  {convertAndFormat(item.cosmosBalance, item.decimals)}{" "}
                </p>
              }
              text="IBC Balance"
            />
            <div className="hidden pl-1 lg:block">{createV10Tooltip()}</div>
          </div>

          {/* displays erc20 tokens in dollars */}
          <span className="text-xs text-darkGray5">
            ${amountToDollars(balance, item.decimals, item.coingeckoPrice)}
          </span>
        </div>

        <div className="hidden lg:block">
          {item.symbol === EVMOS_SYMBOL && createEvmosConvertButton()}
        </div>
        <div className="hidden lg:block">
          {/* displays convert button if user still has ibc balance */}
          {item.symbol !== EVMOS_SYMBOL &&
            !item.cosmosBalance.eq(BIG_ZERO) &&
            createConvertButton()}
          {/* to withdraw axelar, the users need to convert
          the erc20 to ibc-balance */}
          {item.symbol !== EVMOS_SYMBOL &&
            item.handledByExternalUI !== null &&
            createConvertButton()}
        </div>
      </div>
    </div>
  );
};
