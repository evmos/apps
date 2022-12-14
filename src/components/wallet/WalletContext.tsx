import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { WalletExtension } from "../../internal/wallet/functionality/wallet";

export const EmptyWalletContext: WalletExtension = {
  active: false,
  extensionName: "",
  addressEthFormat: "",
  addressCosmosFormat: "",
  evmosPubkey: undefined,
  cosmosPubkey: undefined,
  connect: function (): Promise<boolean> {
    return Promise.resolve(false);
  },
  disconnect: function (): void {
    return;
  },
};

const WalletContextObject = createContext<{
  value: WalletExtension;
  setValue: Dispatch<SetStateAction<WalletExtension>>;
}>({ value: EmptyWalletContext, setValue: () => {} });

export function WalletContext({ children }: { children: JSX.Element }) {
  const [wallet, setWallet] = useState<WalletExtension>(EmptyWalletContext);

  return (
    <WalletContextObject.Provider
      value={{ value: wallet, setValue: setWallet }}
    >
      {children}
    </WalletContextObject.Provider>
  );
}

export const useWalletContext = () => useContext(WalletContextObject);
