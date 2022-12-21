interface LegacyAmino {
  body: string;
  authInfo: string;
  signBytes: string;
}

interface SignDirect {
  body: string;
  authInfo: string;
  signBytes: string;
}

export interface IBCTransferResponse {
  eipToSign: string;
  legacyAmino: LegacyAmino;
  signDirect: SignDirect;
  accountNumber: string;
  chainId: string;
  explorerTxUrl: string;
}

export interface Transaction {
  pubKey: string | null;
  sender: string;
}

export interface ConvertMsg {
  addressEth: string;
  addressCosmos: string;
  amount: string;
  srcChain: string;
  token: string;
}

export interface Message {
  sender: string;
  receiver: string;
  amount: string;
  srcChain: string;
  token: string;
}
export interface TxConvert {
  transaction: Transaction;
  message: Message;
}
