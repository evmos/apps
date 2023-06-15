// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useRouter } from "next/router";
import { Header } from "./header/Header";
import { Navigation } from "ui-helpers";
import { NAV_TO_VESTING } from "constants-helper";
import { AccountDetails } from "./content/AccountDetails";
import { getAccountDetails } from "./helpers";

interface RouterQuery {
  account?: string;
}

// TODO: use it with the right information - use the useProposals as example
const dummyAccountsProps = [
  {
    // eslint-disable-next-line no-secrets/no-secrets
    accountAddress: "evmos1c8wgcmqde5jzymrjrflpp8j20ss000c00zd0ak",
    // eslint-disable-next-line no-secrets/no-secrets
    funderAddress: "evmos1cnr73vd4xcjm83xs8275twu06w3xqr6n7g5cud",
    isVesting: true,
  },
  {
    accountAddress: "0xaF3219826Cb708463B3AA3B73c6640A21497AE49",
    // eslint-disable-next-line no-secrets/no-secrets
    funderAddress: "testingFunder",
    isVesting: true,
  },
];
const Content = () => {
  const router = useRouter();
  const { account }: RouterQuery = router.query;

  return (
    <>
      {account !== undefined && <Navigation href="/" text={NAV_TO_VESTING} />}
      <Header />

      <div className="mt-8 w-full font-[IBM] text-pearl">
        {account === undefined ? (
          <p className="flex justify-center ">
            A list of your vesting accounts will appear here in the next version
          </p>
        ) : (
          <AccountDetails
            props={getAccountDetails(dummyAccountsProps, account)[0]}
          />
        )}
      </div>
    </>
  );
};

export default Content;
