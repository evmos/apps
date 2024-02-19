// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { InstantDappContainer } from "./instant-dapp-container";
import { useRouter, useSearchParams } from "next/navigation";
import { PrimaryButton } from "@evmosapps/ui-helpers";
import { useEffect, useMemo, useRef, useState } from "react";
import { createHost } from "@evmos/dappstore-sdk/internal/host";
import { wagmiConfig } from "../../../evmos-wallet/src";
import { useAccount, useConnections, useConnectors } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { watchConnections } from "wagmi/actions";
import { EIP1193Provider } from "viem";

const WidgetIframe = ({
  dappUrl,
  provider,
}: {
  dappUrl: string;
  provider: EIP1193Provider;
}) => {
  const ref = useRef<HTMLIFrameElement | null>(null);
  useEffect(() => {
    if (!ref.current?.contentWindow) return;

    return createHost({
      target: ref.current.contentWindow,
      provider: provider,
    });
  }, [ref, provider]);
  return <iframe ref={ref} src={dappUrl} height={600} width="100%" />;
};

const Widget = () => {
  const connections = useConnections();
  const [provider, setProvider] = useState<EIP1193Provider | null>(null);

  useEffect(() => {
    const connection = connections[0];
    if (!connection) {
      setProvider(null);
      return;
    }
    if (!("getProvider" in connection.connector)) {
      setProvider(null);
      return;
    }
    connection.connector.getProvider().then((p) => {
      console.log(p);
      setProvider(p as EIP1193Provider);
    });
  }, [connections]);

  // const { data } = useQuery({
  //   queryKey: ["providers"],
  //   queryFn: async () => {
  //     return Promise.all(connectors.map((c) => c.getProvider()));
  //   },
  // });

  // console.log(data);
  const search = useSearchParams();
  const { isConnected } = useAccount();
  const { push } = useRouter();
  const dappUrl = search.get("dappUrl");

  const invalidUrl = useMemo(() => {
    if (!dappUrl) return false;
    try {
      new URL(dappUrl);
    } catch (e) {
      return true;
    }

    return false;
  }, [dappUrl]);
  if (!dappUrl || invalidUrl || !isConnected || !provider)
    return (
      <div className="prose prose-invert">
        <h3>Test your widget here</h3>
        {invalidUrl && (
          <p className="bg-rose-100/5 text-center text-sm rounded border-rose-600 border p-2">
            The URL you provided is not a valid URL. Please provide a valid URL.
          </p>
        )}

        <p>
          You can load your widget here by providing the URL of your dapp in the
          form below.
        </p>
        <form
          className="gap-y-2 flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const dappUrl = formData.get("dappUrl") as string;
            const url = new URL(window.location.href);
            url.searchParams.set("dappUrl", dappUrl);
            push(url.href);
          }}
        >
          <label>
            <h4>Dapp URL:</h4>
          </label>
          <input
            type="text"
            name="dappUrl"
            className="rounded border border-gray-300 p-3 text-sm"
            placeholder="http://localhost:3000..."
            defaultValue={dappUrl ?? ""}
          />

          <PrimaryButton className="w-full" type="submit">
            Submit
          </PrimaryButton>
        </form>
      </div>
    );
  // return null;
  return <WidgetIframe dappUrl={dappUrl} provider={provider} />;
};
export default function DappstoreDemo() {
  return (
    <InstantDappContainer
      image={
        // eslint-disable-next-line no-secrets/no-secrets
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNU+w8AAVEBJyqFqRcAAAAASUVORK5CYII="
      }
      dappName="DemoWidget"
      widget={<Widget />}
    />
  );
}
