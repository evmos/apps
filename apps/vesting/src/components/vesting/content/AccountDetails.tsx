import { useSelector } from "react-redux";
import { BannerMessages, ConfirmButton, Modal, ViewExplorer } from "ui-helpers";
import { KEPLR_KEY, StoreType } from "evmos-wallet";
import { useCallback, useState } from "react";
import { ClawbackModal } from "./modal/ClawbackModal";
import { getVestingAccountNameLocalstorage } from "../helpers";
import { useVestingAccounts } from "../../../internal/hooks/useVesting";

export const AccountDetails = ({ account }: { account?: string }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element>(<></>);

  const value = useSelector((state: StoreType) => state.wallet.value);

  const { loading, error, vestingDetails } = useVestingAccounts(account);

  const handleClawbackClick = useCallback(() => {
    setShowModal(true);
    if (typeof vestingDetails !== "string") {
      setModalContent(<ClawbackModal vestingDetails={vestingDetails} />);
    }
  }, [vestingDetails]);

  const drawContentVesting = useCallback(() => {
    if (loading) {
      return <BannerMessages text="Loading..." spinner={true} />;
    }
    if (error) {
      return <BannerMessages text="No results" />;
    }
    if (typeof vestingDetails === "string") {
      return <BannerMessages text={vestingDetails} />;
    }
    const accountName = getVestingAccountNameLocalstorage(
      vestingDetails.accountAddress
    );
    return (
      <section className="break-words">
        <h1 className="text-2xl">Vesting Account Details</h1>
        <div className="my-5 mr-1 space-y-5 rounded-2xl bg-darkGray2 p-5 font-[IBM] text-sm text-pearl xl:mx-0 ">
          <div className="flex items-center justify-between">
            <h2 className="text-lg uppercase">{accountName} Account</h2>
            <ConfirmButton
              text="Clawback"
              onClick={handleClawbackClick}
              className="w-fit"
              disabled={
                !value.active ||
                value.evmosAddressCosmosFormat !==
                  vestingDetails.funderAddress ||
                value.extensionName === KEPLR_KEY
              }
            />
          </div>
          <div>
            <h3 className="opacity-60">Account Address</h3>
            <ViewExplorer
              txHash={vestingDetails.accountAddress}
              explorerTxUrl="https://www.mintscan.io/evmos/account"
              text={vestingDetails.accountAddress}
            />
          </div>
          <div>
            <h3 className="opacity-60">Funder Address</h3>
            <ViewExplorer
              txHash={vestingDetails.funderAddress}
              explorerTxUrl="https://www.mintscan.io/evmos/account"
              text={vestingDetails.funderAddress}
            />
          </div>
        </div>
      </section>
    );
  }, [error, loading, vestingDetails, handleClawbackClick, value]);

  return (
    <>
      {drawContentVesting()}
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        {modalContent}
      </Modal>
    </>
  );
};
