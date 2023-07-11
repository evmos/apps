import { ConnectMetamask } from "./buttons/ConnectMetamask";
import { InstallMetaMask } from "./buttons/InstallMetaMask";
import {
  changeNetworkToEvmosMainnet,
  getWallet,
  isMetamaskInstalled,
  switchEthereumChain,
  connectHandler,
  queryPubKey,
} from "evmos-wallet";

const getWalletLocal = async () => {
  const wallet = await getWallet();
  if (wallet === null) {
    return false;
    // TODO: show error
  }

  return true;
};

const signPubkey = async () => {
  const wallet = await getWallet();

  if (wallet === null) {
    return false;
  }

  return await connectHandler([wallet]);
};

const checkConnectionMetamask = async () => {
  const ethChain = await switchEthereumChain("0x2329");
  if (ethChain === null) {
    return false;
  }

  const account = await getWallet();

  if (account === null) {
    return false;
  }

  const pubkey = await queryPubKey("https://rest.bd.evmos.org:1317", account);
  if (pubkey === null) {
    return false;
  }
  // it takes like 2 o 3 seconds
  await connectHandler([account]);
  return true;
};

// if href is defined it means that we are going to redirect to a different page
// and the useEffect will call the visibilityChange.
// set it undefined if you don't want to call visibilityChange

const steps = [
  {
    id: "install",
    name: "Install MetaMask",
    checkAction: () => isMetamaskInstalled(),
    loading: ["Waiting for MetaMask Setup"],
    done: "Metamask Installed",
    actions: [() => isMetamaskInstalled()],
    href: "https://metamask.io/download/",
  },

  {
    id: "connect",
    name: "Connect with MetaMask",
    checkAction: () => checkConnectionMetamask(),
    loading: [
      "Approve on Metamask",
      "Select accounts and press Connect",
      "Press Sign",
    ],
    actions: [
      () => changeNetworkToEvmosMainnet(),
      () => getWalletLocal(),
      () => signPubkey(),
    ],
    errors: [
      "Approval Rejected, please try again",
      "Get accounts rejected, please try again",
      "Sign rejected, please try again",
    ],
    done: "Metamask Connected",
  },
];
export const SetUpAccount = () => {
  return (
    <section className="space-y-3">
      <h3 className="font-bold">Set up your account</h3>
      <p className="font-sm text-[#413836]">
        Having an account allows you to use your Evmos to interact with any
        decentralized applications (dApps) on Evmos.
      </p>
      <p className="font-sm text-[#413836]">
        There are different tools to set up your account such as MetaMask, Keplr
        or WalletConnect. For simplicity, we recommend MetaMask.
      </p>
      <nav aria-label="Progress">
        <ol role="list" className="overflow-hidden">
          {steps.map((step, stepIdx) => {
            // manejar un current para sacar el disabled
            if (stepIdx === 0) {
              return (
                <InstallMetaMask
                  key="123"
                  step={step}
                  index={stepIdx}
                  length={steps.length}
                />
              );
            } else {
              return (
                <ConnectMetamask
                  key="234"
                  step={step}
                  index={stepIdx}
                  length={steps.length}
                />
              );
            }
          })}
        </ol>
      </nav>
    </section>
  );
};
