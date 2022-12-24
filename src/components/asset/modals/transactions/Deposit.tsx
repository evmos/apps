import { BigNumber } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableDataElement } from "../../../../internal/asset/functionality/table/normalizeData";
import { IBCChainParams } from "../../../../internal/asset/functionality/transactions/types";
import { StoreType } from "../../../../redux/Store";
import ConfirmButton from "../../../common/ConfirmButton";
import KeplrIcon from "../../../common/images/icons/KeplrIcon";
import { ModalTitle } from "../../../common/Modal";
import { addSnackbar } from "../../../notification/redux/notificationSlice";
import Arrow from "../common/Arrow";
import ErrorMessage from "../common/ErrorMessage";
import FromContainer from "../common/FromContainer";
import ToContainer from "../common/ToContainer";
import { executeDeposit } from "../../../../internal/asset/functionality/transactions/deposit";
import { getKeplrAddressByChain } from "../../../../internal/wallet/functionality/keplr/keplrHelpers";
import { getBalance } from "../../../../internal/asset/functionality/fetch";
import { BIG_ZERO } from "../../../../internal/common/math/Bignumbers";

const Deposit = ({
  item,
  feeBalance,
  address,
}: {
  item: TableDataElement;
  feeBalance: BigNumber;
  address: string;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [confirmClicked, setConfirmClicked] = useState(false);
  const [addressTo, setAddressTo] = useState("");
  const wallet = useSelector((state: StoreType) => state.wallet.value);

  const dispatch = useDispatch();

  const fee = BigNumber.from("4600000000000000");
  const feeDenom = "EVMOS";
  const [balance, setBalance] = useState(BIG_ZERO);
  const [walletToUse, setWalletToUse] = useState("");

  useEffect(() => {
    async function getData() {
      const wallet = await getKeplrAddressByChain(item.chainId);
      if (wallet === null) {
        return;
        // TODO: mostrar snackbar y cerrar modal
      }
      setWalletToUse(wallet);
      const balance = await getBalance(
        wallet,
        item.chainIdentifier.toUpperCase(),
        item.symbol
      );
      setBalance(BigNumber.from(balance.balance ? balance.balance.amount : 0));
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getData();
  }, [address, item]);

  return (
    <>
      <ModalTitle title={`Deposit ${item.symbol}`} />
      <div className="text-darkGray3">
        <div className="bg-skinTan px-8 py-4 rounded-lg space-y-3 ">
          {/* TODO: borrar fee denom de deposit */}
          <FromContainer
            fee={{
              // modificar fee
              fee,
              feeDenom,
              feeBalance: feeBalance,
              feeDecimals: 18,
            }}
            balance={{
              denom: item.symbol,
              amount: balance,
              decimals: item.decimals,
            }}
            input={{ value: inputValue, setInputValue, confirmClicked }}
            style={{
              tokenTo: item.symbol,
              address: walletToUse,
              img: `/tokens/${item.symbol.toLowerCase()}.png`,
              text: item.symbol,
            }}
          />
        </div>
        <Arrow />
        <div className="bg-skinTan px-8 py-4 rounded-lg space-y-5 mb-8">
          <ToContainer token="EVMOS" img={`/tokens/evmos.png`} />
          <div className="space-y-3">
            <div className="pr-5 pl-2 flex items-center space-x-3 bg-white hover:border-black focus-visible:border-black focus-within:border-black border border-darkGray5 rounded-lg">
              <input
                className="w-full p-3 border-none hover:border-none focus-visible:outline-none"
                value={addressTo}
                onChange={(e) => {
                  setAddressTo(e.target.value);
                }}
              />
            </div>
            {confirmClicked && addressTo === "" && (
              <ErrorMessage text="Address can not be empty" />
            )}
            <h6 className="italic text-sm">
              IMPORTANT: Transferring to an incorrect address will result in
              loss of funds.
            </h6>
            <div className="flex items-center space-x-5 w-full justify-end">
              <span className="uppercase font-bold">Autofill</span>
              <KeplrIcon
                width={25}
                height={25}
                className="cursor-pointer"
                // TODO: add metamask too
                // onClick={async () => {
                //   const keplrAddress = await getKeplrAddressByChain(
                //     item.chainId
                //   );
                //   if (keplrAddress === null) {
                //     dispatch(
                //       addSnackbar({
                //         id: 0,
                //         text: "Could not get information from Keplr",
                //         subtext:
                //           "Please unlock the extension and allow the app to access your wallet address",
                //         type: "error",
                //       })
                //     );
                //     return;
                //   }
                //   setAddressTo(keplrAddress);
                // }}
              />
            </div>
          </div>
        </div>
        <ConfirmButton
          onClick={async () => {
            setConfirmClicked(true);
            if (wallet.osmosisPubkey === null) {
              dispatch(
                addSnackbar({
                  id: 0,
                  text: "Wallet not connected",
                  subtext:
                    "Can not create a transaction without a wallet connected!",
                  type: "error",
                })
              );
              // TODO: close modal
              return;
            }

            if (
              inputValue === undefined ||
              inputValue === null ||
              inputValue === "" ||
              addressTo === undefined ||
              addressTo === null ||
              addressTo === ""
            ) {
              // TODO: Add this validation to the input onchange

              return;
            }

            let amount = "";
            try {
              amount = parseUnits(
                inputValue,
                BigNumber.from(item.decimals)
              ).toString();
            } catch (e) {
              dispatch(
                addSnackbar({
                  id: 0,
                  text: "Wrong params",
                  subtext: "Amount can only be a positive number",
                  type: "error",
                })
              );
              // TODO: close modal
              return;
            }
            const keplrAddress = await getKeplrAddressByChain(item.chainId);
            if (keplrAddress === null) {
              return;
            }
            const params: IBCChainParams = {
              sender: keplrAddress,
              receiver: addressTo,
              amount,
              srcChain: item.chainIdentifier,
              dstChain: "EVMOS",
              token: item.symbol,
            };

            const res = await executeDeposit(
              wallet.osmosisPubkey,
              keplrAddress,
              params,
              item.chainIdentifier.toUpperCase(),
              wallet.extensionName
            );

            dispatch(
              addSnackbar({
                id: 0,
                text: res.title,
                subtext: res.message,
                type: res.error === true ? "error" : "success",
              })
            );
          }}
          text="Deposit"
        />
      </div>
    </>
  );
};

export default Deposit;
