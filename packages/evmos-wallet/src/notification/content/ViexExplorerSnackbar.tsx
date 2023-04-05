import ViewExplorer from "../../common/ViewExplorer";

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
