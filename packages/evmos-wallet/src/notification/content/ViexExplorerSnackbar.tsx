// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ViewExplorer } from "ui-helpers";

type snackbarProps = {
  title: string;
  hash: string;
  explorerTxUrl: string;
};

export const ViewExplorerSnackbar = ({ values }: { values: snackbarProps }) => {
  return (
    <div>
      <p>{values.title}</p>
      <ViewExplorer
        txHash={values.hash}
        explorerTxUrl={`${values.explorerTxUrl}`}
        text="Tx explorer"
      />
    </div>
  );
};
