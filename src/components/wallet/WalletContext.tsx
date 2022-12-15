import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ResultMessage } from "../../internal/wallet/functionality/errors";
import {
  GetProviderFromLocalStorage,
  RemoveProviderFromLocalStorage,
} from "../../internal/wallet/functionality/localstorage";
import { Metamask } from "../../internal/wallet/functionality/metamask/metamask";
import {
  METAMASK_KEY,
  WalletExtension,
} from "../../internal/wallet/functionality/wallet";

export const EmptyWalletContext: WalletExtension = {
  active: false,
  extensionName: "",
  addressEthFormat: "",
  addressCosmosFormat: "",
  evmosPubkey: undefined,
  cosmosPubkey: undefined,
  connect: function (): Promise<ResultMessage> {
    return Promise.resolve({
      result: false,
      message: "Wallet provider not selected",
    });
  },
  disconnect: function (): ResultMessage {
    return { result: false, message: "Wallet provider not selected" };
  },
};

const WalletContextObject = createContext<{
  value: WalletExtension;
  setValue: Dispatch<SetStateAction<WalletExtension>>;
}>({
  value: EmptyWalletContext,
  setValue: () => {
    // TODO: implement function
    throw "Not implemented!";
  },
});

export function WalletContext({ children }: { children: JSX.Element }) {
  const [wallet, setWallet] = useState<WalletExtension>(EmptyWalletContext);

  // Reload last used wallet if stored in the localstore
  const firstUpdate = useRef(true);

  useEffect(() => {
    // Execute the hook only once
    if (firstUpdate.current === false) {
      return;
    }

    // Read the localstorage info to reload the provider
    async function ReloadProvider() {
      const provider = GetProviderFromLocalStorage();
      if (provider === METAMASK_KEY) {
        const wallet = new Metamask();
        const connectResp = await wallet.connect();
        if (connectResp.result === true) {
          setWallet(wallet);
        }
      } else {
        // Invalid provider is set, remove it
        RemoveProviderFromLocalStorage();
      }
    }

    // Execute the async function
    ReloadProvider();

    // Mark the ref as already executed
    firstUpdate.current = false;
  });

  return (
    <WalletContextObject.Provider
      value={{ value: wallet, setValue: setWallet }}
    >
      {children}
    </WalletContextObject.Provider>
  );
}

export const useWalletContext = () => useContext(WalletContextObject);
