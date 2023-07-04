import { EvmosRedIcon } from "icons";

export const ConnectToEvmos = () => {
  return (
    <div className="space-y-3 px-4 pb-4 pt-5 sm:p-6">
      <EvmosRedIcon />
      <h3 className="text-gray-900 text-base font-semibold leading-6">
        Connect your account
      </h3>

      <p>Get started with Evmos!</p>
      <p>
        We recommend for first-time users to use
        <b> Evmos Copilot</b>.
      </p>
    </div>
  );
};
