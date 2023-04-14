import { ButtonWalletConnection, StoreType } from "evmos-wallet";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "ui-helpers";
import { Dispatch, SetStateAction } from "react";
export const StatefulHeader = ({
  pageName,
  setShowSidebar,
}: {
  pageName: string;
  setShowSidebar?: Dispatch<SetStateAction<boolean>>;
}) => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const dispatch = useDispatch();
  return (
    <Header
      pageName={pageName}
      setShowSidebar={setShowSidebar}
      walletConnectionButton={
        <ButtonWalletConnection walletExtension={wallet} dispatch={dispatch} />
      }
    />
  );
};
