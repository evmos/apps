import dynamic from "next/dynamic";

const ButtonWalletConnection = dynamic(
  () => import("./wallet/ButtonWalletConnection")
);

const MissionHeader = ({ pageName }: { pageName: string }) => {
  return (
    <div className="pt-4 mb-3 text-white flex flex-col xl:flex-row xl:items-center xl:justify-between mx-5 xl:mx-0">
      <div className="flex items-center justify-between xl:justify-start">
        <p className="text-xl font-bold">{pageName}</p>
      </div>
      <ButtonWalletConnection />
    </div>
  );
};

export default MissionHeader;
