// List of the posible errors to display to the user
export declare type ResultMessage = {
  result: boolean;
  message: string;
};

export const METAMASK_ERRORS = {
  PubkeyError:
    "An error was produced while getting the public key, please sign the generate_pubkey message",
  ChangeNetwork:
    "An error was produced while changing your Metamask network to Evmos, please select the Evmos network in your wallet extension",
  SubscribeChangeNetwork:
    "An error was produced while listening to change network events, please restart your browser",
  GetWallet:
    "An error was produced while getting your Metamask address, please allow the app to interact with your wallet",
} as const;

export const METAMASK_SUCCESS_MESSAGES = {
  Connected: "Successfully connected to Metamask",
  Disconnected: "Disconnected from Metamask",
} as const;

export const KEPLR_ERRORS = {
  ExtensionNotFound: "Could not find Keplr Extension",
  ConnectionError: "Could not connect to Evmos and Osmosis Network",
  ChangeNetwork:
    "An error was produced while changing your Metamask network to Evmos, please select the Evmos network in your wallet extension",
  SubscribeChangeNetwork:
    "An error was produced while listening to change network events, please restart your browser",
  GetWallet:
    "An error was produced while getting your Metamask address, please allow the app to interact with your wallet",
} as const;

export const KEPLR_SUCCESS_MESSAGES = {
  Connected: "Successfully connected to Keplr",
  Disconnected: "Disconnected from Keplr",
} as const;
