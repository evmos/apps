// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ExternalLinkIcon } from "icons";

export const ViewExplorer = ({
  txHash,
  explorerTxUrl,
  text,
}: {
  txHash: string;
  explorerTxUrl: string;
  text?: string;
}) => {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={`${explorerTxUrl}/${txHash}`}
      className="flex items-center space-x-2 text-sm w-fit"
    >
      <p>{text}</p>
      <ExternalLinkIcon width={18} height={18} />
    </a>
  );
};
