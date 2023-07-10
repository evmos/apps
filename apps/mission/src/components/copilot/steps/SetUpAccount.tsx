import { ConnectMetamask } from "./buttons/ConnectMetamask";
import { InstallMetaMask } from "./buttons/InstallMetaMask";

const steps = [
  {
    id: "install MM",
    name: "Install MetaMask",
    loading: ["Waiting for MetaMask Setup"],
    done: "Metamask Installed",
    href: "https://metamask.io/download/",
  },

  {
    id: "Connect MM",
    name: "Connect MetaMask 2",
    loading: ["Press Approve on Metamask", "Select accounts and press Connect"],
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
