import { BigNumber } from "ethers";
import { MODAL_NOTIFICATIONS } from "../../../../../internal/asset/functionality/transactions/errors";
import {
  convertAndFormat,
  convertFromAtto,
  getReservedForFeeText,
  numericOnly,
  safeSubstraction,
  truncateNumber,
} from "../../../../../internal/asset/style/format";
import { EVMOS_SYMBOL } from "../../../../../internal/wallet/functionality/networkConfig";
import DropdownTokens from "../../../dropdown/DropdownTokens";
import SmallButton from "../../../../common/SmallButton";
import ContainerInput from "../ContainerInput";
import { ContainerModal } from "../ContainerModal";
import ErrorMessage from "../ErrorMessage";
import Note from "../Note";
import { TextSmall } from "../TextSmall";
import { AmountWithdrawProps } from "../types";

const AmountWithdraw = ({
  amountProps,
}: {
  amountProps: AmountWithdrawProps;
}) => {
  const fee = BigNumber.from("4600000000000000");
  const feeDenom = EVMOS_SYMBOL;

  const handleOnClickMax = () => {
    if (amountProps.token !== undefined) {
      // evmos keeps using cosmosBalance
      let balance = amountProps.token.erc20Balance;
      if (amountProps.token.symbol === EVMOS_SYMBOL) {
        balance = amountProps.token.cosmosBalance;
      }
      if (amountProps.token.symbol.toUpperCase() !== feeDenom.toUpperCase()) {
        amountProps.setValue(
          numericOnly(convertFromAtto(balance, amountProps.token.decimals))
        );
      } else {
        const val = safeSubstraction(balance, fee);
        amountProps.setValue(
          numericOnly(convertFromAtto(val, amountProps.token.decimals))
        );
      }
    }
  };

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    amountProps.setValue(numericOnly(e.target.value));
  };
  return (
    <ContainerModal>
      <>
        {amountProps.token === undefined ||
        amountProps.token.handledByExternalUI === null ? (
          <TextSmall text="AMOUNT" />
        ) : (
          <TextSmall text="SELECT BRIDGE" />
        )}
        {amountProps.token !== undefined &&
          amountProps.token.handledByExternalUI !== null && (
            <Note
              text="We currently do not offer transfers directly from Ethereum. For now,
        here area few options that will allow you to withdraw from Evmos"
            />
          )}
        <ContainerInput>
          <>
            <DropdownTokens
              placeholder="Select token..."
              data={amountProps.data}
              setToken={amountProps.setToken}
              setAddress={amountProps.setReceiverAddress}
              setValue={amountProps.setValue}
            />

            {amountProps.token === undefined ||
            amountProps.token.handledByExternalUI === null ? (
              <>
                <input
                  className="w-full  border-none hover:border-none focus-visible:outline-none text-right"
                  type="text"
                  placeholder="amount"
                  value={amountProps.value}
                  onChange={handleOnChangeInput}
                />
                <SmallButton text="MAX" onClick={handleOnClickMax} />
              </>
            ) : (
              ""
            )}
          </>
        </ContainerInput>
        <div className="flex flex-col">
          {amountProps.confirmClicked && amountProps.token === undefined && (
            <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorTokenEmpty} />
          )}
          {truncateNumber(amountProps.value) === 0 && (
            <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorZeroAmountSubtext} />
          )}
          {amountProps.confirmClicked && amountProps.value === "" && (
            <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorAmountEmpty} />
          )}
          {amountProps.token !== undefined &&
            amountProps.token.handledByExternalUI === null &&
            truncateNumber(amountProps.value) >
              truncateNumber(
                numericOnly(
                  convertFromAtto(
                    // evmos keeps using cosmosBalance
                    amountProps.token.symbol === EVMOS_SYMBOL
                      ? amountProps.token.cosmosBalance
                      : amountProps.token.erc20Balance,
                    amountProps.token.decimals
                  )
                )
              ) && <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorsAmountGt} />}
        </div>
        <div className="space-y-2">
          {amountProps.token !== undefined &&
            amountProps.token.handledByExternalUI === null && (
              <>
                <p className="font-bold text-sm">
                  Available Balance:{" "}
                  <span className="font-normal opacity-80">
                    {convertAndFormat(
                      // evmos keeps using cosmosBalance
                      amountProps.token.symbol === EVMOS_SYMBOL
                        ? amountProps.token.cosmosBalance
                        : amountProps.token.erc20Balance,
                      amountProps.token.decimals
                    )}{" "}
                    {amountProps.token.symbol}
                  </span>
                </p>
                <Note
                  text={getReservedForFeeText(
                    BigNumber.from(fee),
                    EVMOS_SYMBOL,
                    EVMOS_SYMBOL
                  )}
                />
              </>
            )}
        </div>
      </>
    </ContainerModal>
  );
};

export default AmountWithdraw;
