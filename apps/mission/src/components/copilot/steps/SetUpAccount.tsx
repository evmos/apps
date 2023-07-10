import { ConnectMetamask } from "./buttons/ConnectMetamask";
import { InstallMetaMask } from "./buttons/InstallMetaMask";
import {
  Metamask,
  changeNetworkToEvmosMainnet,
  getWallet,
  isMetamaskInstalled,
  store,
  switchEthereumChain,
} from "evmos-wallet";

const getWallets = async () => {
  const wallet = await getWallet();
  if (wallet === null) {
    console.log(wallet);
    return [false, "No wallet"];
    // TODO: show error
  }

  return [true, wallet];
};

const signPubkey = async () => {
  const wallet = await getWallets();
  if (wallet[0]) {
    const metamask = new Metamask(store);
    if (metamask === null) {
      return; // TODO: show error
    }

    await metamask.connectHandler([wallet[1] as string]);
  }
};
const steps = [
  {
    id: "install",
    name: "Install MetaMask",
    loading: ["Waiting for MetaMask Setup"],
    done: "Metamask Installed",
    actions: [() => isMetamaskInstalled()],
    href: "https://metamask.io/download/",
  },

  {
    id: "connect",
    name: "Connect with MetaMask",
    loading: [
      "Approve on Metamask",
      "Select accounts and press Connect",
      "Press Sign",
    ],
    actions: [
      () =>
        switchEthereumChain(
          process.env.NEXT_PUBLIC_EVMOS_ETH_CHAIN_ID ?? "0x2329"
        ),
      () => changeNetworkToEvmosMainnet(),
      () => getWallets(),
      () => signPubkey(),
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
