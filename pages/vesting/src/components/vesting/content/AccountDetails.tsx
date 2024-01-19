// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BannerMessages } from "@evmosapps/ui-helpers";
import { useCallback, useState } from "react";
import { ClawbackModal } from "./modal/ClawbackModal";
import { getVestingAccountNameLocalstorage } from "../helpers";
import { useVestingAccounts } from "../../../internal/hooks/useVesting";
import { AccountContent } from "./modal/AccountContent";
import { normalizeToEvmos } from "@evmosapps/evmos-wallet";
import { Modal } from "../../Modal";

export const AccountDetails = ({ account = "" }: { account?: string }) => {
  const [showModal, setIsOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element>(<></>);
  const _account = normalizeToEvmos(account);
  const { loading, error, vestingDetails } = useVestingAccounts(_account);

  const handleClawbackClick = useCallback(() => {
    setIsOpenModal(true);
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
      <AccountContent
        vestingDetails={vestingDetails}
        accountName={accountName}
        handleClawbackClick={handleClawbackClick}
      />
    );
  }, [error, loading, vestingDetails, handleClawbackClick]);

  return (
    <>
      {drawContentVesting()}
      <Modal
        show={showModal}
        onClose={() => {
          setIsOpenModal(false);
        }}
      >
        {modalContent}
      </Modal>
    </>
  );
};
