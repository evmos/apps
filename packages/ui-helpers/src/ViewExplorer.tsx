// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ExternalLinkIcon } from "@evmosapps/icons/ExternalLinkIcon";

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
      className="flex w-fit items-center space-x-2 text-xs"
    >
      <p>{text}</p>
      <ExternalLinkIcon width={18} height={18} />
    </a>
  );
};
