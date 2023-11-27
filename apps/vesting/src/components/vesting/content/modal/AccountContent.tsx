import { KEPLR_KEY, StoreType, normalizeToEth } from "@evmosapps/evmos-wallet";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";
import { ConfirmButton } from "@evmosapps/ui-helpers";
import { VestingAccountDetail } from "../../../../internal/types";
import { AmountItem } from "./AmountItem";
import { AddresItem } from "./AddressItem";
import { ethers } from "ethers";

type AccountContentProps = {
  vestingDetails: VestingAccountDetail;
  accountName: string;
  handleClawbackClick: () => void;
};

export const AccountContent = ({
  vestingDetails,
  accountName,
  handleClawbackClick,
}: AccountContentProps) => {
  const { t } = useTranslation();
  const value = useSelector((state: StoreType) => state.wallet.value);

  const vestedEvmos = ethers.formatEther(vestingDetails?.originalVestingAmount);
  const unvestedEvmos = ethers.formatEther(vestingDetails?.unvestedAmount);

  return (
    <section className="break-words">
      <h1 className="text-2xl">{t("vesting.account.details.title")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
        {/* TODO: create reusable component for generic card used in all dapps */}
        <div className="my-5 mr-1 space-y-5 rounded-2xl bg-darkGray2 p-5 text-sm text-pearl xl:mx-0 ">
          <div className="flex items-center justify-between">
            <h2 className="text-lg uppercase">
              {accountName} {t("vesting.account.details.account.name")}
            </h2>
          </div>
          <AddresItem
            bech32Address={vestingDetails.accountAddress}
            hexAddress={normalizeToEth(vestingDetails.accountAddress)}
            title={t("vesting.account.details.account.address.title")}
          />

          <AddresItem
            bech32Address={vestingDetails.funderAddress}
            hexAddress={normalizeToEth(vestingDetails.funderAddress)}
            title={t("vesting.account.details.funder.address.title")}
          />
        </div>
        <div className="my-5 mr-1 space-y-5 rounded-2xl bg-darkGray2 p-5 text-sm text-pearl xl:mx-0 ">
          <AmountItem
            text={t("vesting.account.details.total.vesting.title")}
            amount={vestedEvmos}
          />
          <AmountItem
            text={t("vesting.account.details.vested.title")}
            amount={(
              parseFloat(vestedEvmos) - parseFloat(unvestedEvmos)
            ).toString()}
          />

          <div className="flex md:flex-row flex-col justify-between space-y-3 md:space-y-0 flex-shrink-0">
            <AmountItem
              text={t("vesting.account.details.not.vested.title")}
              amount={unvestedEvmos}
            />
            <ConfirmButton
              text={t("clawback.button.action.title")}
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
        </div>
      </div>
    </section>
  );
};
