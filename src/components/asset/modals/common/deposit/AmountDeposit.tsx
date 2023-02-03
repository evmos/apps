import { MODAL_NOTIFICATIONS } from "../../../../../internal/asset/functionality/transactions/errors";
import {
  convertAndFormat,
  convertFromAtto,
  createBigNumber,
  numericOnly,
  safeSubstraction,
  truncateNumber,
} from "../../../../../internal/asset/style/format";
import DropdownTokens from "../../../dropdown/DropdownTokens";
import SmallButton from "../../../../common/SmallButton";
import ContainerInput from "../ContainerInput";
import { ContainerModal } from "../ContainerModal";
import ErrorMessage from "../ErrorMessage";
import Note from "../Note";
import { TextSmall } from "../TextSmall";
import { AmountDepositProps } from "../types";
import { useState } from "react";

const AmountDeposit = ({
  amountProps,
}: {
  amountProps: AmountDepositProps;
}) => {
  const feeDeposit = "5000";
  const [maxClicked, setMaxClicked] = useState(false);

  const handleOnClickMax = () => {
    if (
      amountProps.token !== undefined &&
      amountProps.fee.feeDenom !== undefined
    ) {
      if (
        amountProps.token.symbol.toUpperCase() !==
        amountProps.fee.feeDenom.toUpperCase()
      ) {
        amountProps.setValue(
          numericOnly(
            convertFromAtto(amountProps.balance, amountProps.token.decimals)
          )
        );
        setMaxClicked(true);
      } else {
        const val = safeSubstraction(amountProps.balance, amountProps.fee.fee);
        amountProps.setValue(
          numericOnly(convertFromAtto(val, amountProps.token.decimals))
        );
        setMaxClicked(true);
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
                    amountProps.balance,
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
                      amountProps.balance,
                      amountProps.token.decimals
                    )}{" "}
                    {amountProps.token.symbol}
                  </span>
                </p>
              </>
            )}
        </div>
        {amountProps.fee.fee.eq(createBigNumber(feeDeposit)) &&
          maxClicked &&
          amountProps.token !== undefined && (
            <div className="text-xs font-bold opacity-80">
              {`Clicking on max reserves ${feeDeposit} * 10^-${amountProps.token?.decimals} ${amountProps.token?.symbol} for transaction fees.`}
            </div>
          )}
      </>
    </ContainerModal>
  );
};

export default AmountDeposit;
