import { get } from "lodash-es";
import { readFiles } from "./readFiles";
import { ChainRegistry } from "./types/chain";
import { Log } from "helpers";

const chains = await readFiles<ChainRegistry>(
  "node_modules/chain-token-registry/chainConfig/*.json"
);
const url =
  "https://g.w.lavanet.xyz:443/gateway/evmos/rest/ef1ad852a77275e1eeef6c7972370118";

for (const chainRegistry of chains) {
  if (chainRegistry.prefix === "evmos") {
    continue;
  }
  if (!chainRegistry.configurations) {
    continue;
  }
  for (const {
    clientId,
    identifier,
    source,
    rest,
  } of chainRegistry.configurations) {
    const clientStatus = await fetch(
      `${url}/ibc/core/client/v1/client_status/${clientId}`
    );
    const json = (await clientStatus.json()) as unknown;
    Log().info(identifier);
    Log().info(clientId, get(json, "status"));
    if (!source) {
      Log().info("no source");
      continue;
    }
    const channelInfo = await fetch(
      `${rest[0]}/ibc/core/channel/v1/channels/${source.sourceChannel}/ports/transfer`
    );
    const channelJson = (await channelInfo.json()) as unknown;
    const connectionId = get(channelJson, "channel.connection_hops[0]") as
      | string
      | undefined;

    if (!connectionId) {
      Log().info("no connection id");
      Log().info("------------------");
      continue;
    }
    const connectionInfo = await fetch(
      `${rest[0]}/ibc/core/connection/v1/connections/${connectionId}/client_state`
    );
    const connectionInfoJson = (await connectionInfo.json()) as unknown;
    const counterpartyClientId = get(
      connectionInfoJson,
      "identified_client_state.client_id"
    ) as string | undefined;

    if (!counterpartyClientId) {
      Log().info("no client id");
      Log().info("------------------");

      continue;
    }
    Log().info("Counterparty");
    const counterpartyClientStatus = await fetch(
      `${rest[0]}/ibc/core/client/v1/client_status/${counterpartyClientId}`
    );
    const counterpartyClientStatusJson =
      (await counterpartyClientStatus.json()) as unknown;

    Log().info(
      counterpartyClientId,
      get(counterpartyClientStatusJson, "status")
    );
    Log().info("------------------");
  }
}
