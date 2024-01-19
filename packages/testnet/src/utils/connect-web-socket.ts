// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import WebSocket from "ws";

export const connectWebSocket = async (
  url: string,
  onOpen?: (ws: WebSocket) => void
) =>
  new Promise<WebSocket>((resolve, reject) => {
    const ws = new WebSocket(url, {});

    ws.onopen = () => {
      resolve(ws);
      onOpen?.(ws);
    };
    ws.onerror = (error) => {
      reject(error);
    };
  });
