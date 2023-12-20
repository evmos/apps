import { EvmosCopilotRedIcon } from "icons";
import { PrimaryButton } from "./PrimaryButton";

export const ConnectionRequired = ({
  bgUrl,
  dappName,
}: {
  bgUrl: string;
  dappName: string;
}) => {
  return (
    <div
      className={`relative blur-image after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:z-10 after:bg-[rgba(0,0,0,.3)] z-[10] h-[450px] bg-center bg-no-repeat bg-cover ${bgUrl} flex flex-col justify-center`}
    >
      <div className="z-[9999] text-center flex flex-col items-center space-y-3 text-lg px-8">
        <EvmosCopilotRedIcon height={50} />
        <p className="text-pearl ">Connection required</p>
        <p className="font-light">
          Please connect your account in order to interact with the {dappName}
          Instant dApp
        </p>
        <PrimaryButton as="a" variant={"primary"} href="?action=connect">
          Connect
        </PrimaryButton>
      </div>
    </div>
  );
};