// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

interface Ethereum {
  request(args: {
    method: string;
    params: {
      type: string;
      options: {
        address: string;
        symbol: string;
        decimals: number;
        image: string;
      };
    };
  }): Promise<boolean>;
}

declare const ethereum: Ethereum;

export async function addTokenFunction(
  tokens: {
    address: string;
    symbol: string;
    decimals: number;
    image: string;
  }[],
) {
  try {
    const filteredTokens = tokens.filter(
      (token) => token.symbol !== "EVMOS" && token.symbol !== "WEVMOS",
    );
    const requests = filteredTokens.map((token) => ({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: token.address,
          symbol: token.symbol,
          decimals: token.decimals,
          image: token.image,
        },
      },
    }));
    // Send all requests to Metamask
    await Promise.all(requests.map((request) => ethereum.request(request)));
  } catch (error) {}
}
