import { CopyIcon } from "@evmosapps/icons/CopyIcon";
import { Tooltip } from "@evmosapps/ui-helpers";
import { useEffect, useState } from "react";

export const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timeout = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
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
      }}
    >
      <Tooltip
        element={<CopyIcon width={14} height={14} />}
        text={isCopied ? "Copied!" : "Copy"}
      />
    </button>
  );
};
