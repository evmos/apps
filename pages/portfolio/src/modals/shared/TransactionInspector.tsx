import React from "react";
import { serialize } from "wagmi";
import { getActiveProviderKey } from "@evmosapps/evmos-wallet";
import { E, cn } from "helpers";
import { useSend } from "../hooks/useSend";

export const TransactionInspector = ({
  sender,
  receiver,
  token,
  fee,
  balance,
  feeBalance,
  ...props
}: ReturnType<typeof useSend>["__DEBUG__"]) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      {!isOpen && (
        <button
          className="fixed top-0 left-0 bg-slate-600 p-4 text-white font-bold z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          Transaction inspector
        </button>
      )}
      {isOpen && (
        <div className="fixed top-0 left-0 z-40 h-full w-72 bg-slate-600 text-white overflow-y-auto p-4  text-xs">
          <button
            className="absolute top-0 right-0 bg-slate-600 p-4 text-white font-bold z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            Close
          </button>
          <h1 className="text-2xl font-bold mb-4">Transaction inspector</h1>

          <dl className="space-y-2 grid grid-cols-2 [&>dt]:font-bold [&>dt]:border-b [&>dd]:border-b">
            <dt>Connected wallet</dt>
            <dd>{getActiveProviderKey()}</dd>
            <dt>Sender</dt>
            <dd>{sender}</dd>
            <dt>Receiver</dt>
            <dd>{receiver}</dd>

            <dt>Token</dt>
            <dd>{token?.ref}</dd>
            <dt>Amount</dt>
            <dd>{token?.amount.toString()}</dd>

            <dt>Fee</dt>
            <dd>{fee?.token.ref}</dd>
            <dt>Fee Amount</dt>
            <dd>{fee?.token.amount.toString()}</dd>

            <dt>Balance</dt>
            <dd>{balance?.value.toString()}</dd>
            <dt>Fee Balance</dt>
            <dd>{feeBalance?.value.toString()}</dd>
          </dl>
          {(
            [
              ["Transfer Query", props.transferQuery], //
              ["Fee Query", props.feeQuery], //
              ["Balance Query", props.balanceQuery], //
              ["Fee Balance Query", props.feeBalanceQuery],
            ] as const
          ).map(([title, query]) => (
            <div key={title} className="space-y-2">
              <h2 className="font-bold">{title}</h2>
              <p>{!!query.error && E.ensureError(query.error).message}</p>
              <pre
                className={cn([" p-2 border-2"], {
                  "border-red": query.error,
                  "animate-pulse": query.isPending,
                  "border-green": query.isSuccess,
                })}
              >
                {serialize(query, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
