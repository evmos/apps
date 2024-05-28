// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { CopyIcon } from "@evmosapps/icons/CopyIcon";

import { useEffect, useState } from "react";
import { Tooltip } from ".";
import { TrackerEvents, sendEvent } from "tracker";
import { IconCheck } from "@evmosapps/ui/icons/line/basic/check.tsx";

export const CopyButton = ({
  text,
  event,
  properties,
}: {
  text: string;
  event?: TrackerEvents;
  properties?: { [key: string]: string };
}) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timeout = setTimeout(() => {
      setIsCopied(false);
    }, 3500);
    return () => {
      clearTimeout(timeout);
    };
  }, [isCopied]);

  return (
    <button
      className="text-xs font-normal"
      onClick={async (e) => {
        e.preventDefault();
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        event && sendEvent(event, properties);
      }}
    >
      <Tooltip
        element={
          isCopied ? (
            <IconCheck width={14} height={14} />
          ) : (
            <CopyIcon width={14} height={14} />
          )
        }
        text={isCopied ? "Copied!" : "Copy"}
      />
    </button>
  );
};
