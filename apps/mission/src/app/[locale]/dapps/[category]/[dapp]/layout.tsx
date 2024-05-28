// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import React from "react";
import { DappDetailsPage } from "@evmosapps/dappstore-page/src/pages/dapp-explorer/dapp-details/dapp-details-page";
import { WIDGETS } from "@evmosapps/dappstore-page/src/pages/dapp-explorer/partials/widgets-index";

export default function Layout({
  params,
}: {
  params: {
    dapp: string;
    category: string;
    locale: string;
  };
}) {
  const Widget = WIDGETS[params.dapp];
  return (
    <DappDetailsPage widget={Widget ? <Widget /> : undefined} params={params} />
  );
}

