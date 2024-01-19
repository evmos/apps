// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Block } from "../types/block";
import { Config } from "./cosmos-config";
import WebSocket from "ws";
import { get } from "lodash-es";
import { connectWebSocket } from "../utils/connect-web-socket";
import { delay } from "../utils/delay";

export const listenToBlocks = async (config: Config) => {
  const tendermintUrl = `http://127.0.0.1:${config.api.rpc}/websocket`;
  let ws: WebSocket | undefined;
  while (ws === undefined) {
    try {
      ws = await connectWebSocket(tendermintUrl, (ws) => {
        ws.send(
          JSON.stringify({
            jsonrpc: "2.0",
            method: "subscribe",
            params: ["tm.event='NewBlock'"],
            id: 1,
          }),
        );
      });
    } catch (e) {
      await delay(1000);
    }
  }

  const subscriptions = new Set<(height: bigint, block: Block) => void>();
  let lastBlock: Block | null = null;
  let height = 0n;
  ws.onmessage = (message) => {
    const response = JSON.parse(String(message.data)) as unknown;
    lastBlock = get(response, "result.data") ?? lastBlock;

    if (lastBlock) {
      height = BigInt(lastBlock.value.block.header.height);
      for (const subscription of subscriptions) {
        subscription(height, lastBlock);
      }
    }
  };
  const subscribe = (cb: (blocNumber: bigint, block: Block) => void) => {
    subscriptions.add(cb);

    return () => {
      subscriptions.delete(cb);
    };
  };

  const waitForBlockHeight = (targetHeight: bigint) =>
    new Promise<Block>((resolve, reject) => {
      if (height >= targetHeight && lastBlock) {
        resolve(lastBlock);
      }
      const onClose = () => {
        reject(new Error("websocket closed"));
      };
      ws?.addEventListener("close", onClose);
      const unsubscribe = subscribe((blockHeight: bigint, block: Block) => {
        if (blockHeight >= targetHeight) {
          resolve(block);
          unsubscribe();
          ws?.removeEventListener("close", onClose);
        }
      });
    });
  return {
    getHeight() {
      return height;
    },
    subscribe,
    waitForBlockHeight,
    waitNBlocks: async (n: number | bigint) =>
      waitForBlockHeight(height + BigInt(n)),
  };
};
