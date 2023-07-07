import { InstallMetaMask } from "./buttons/InstallMetaMask";

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
      <InstallMetaMask />
    </section>
  );
};
