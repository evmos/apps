// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { getKeplrProvider, signKeplrDirect } from "../../wallet";
import { DirectSignResponse, Keplr } from "@keplr-wallet/types";
import { signLeapDirect } from "../../wallet/utils/leap/signLeapDirect";
import { DirectSignResponse as DirectSignResponseCosmjs } from "@cosmjs/proto-signing";
import { Leap } from "../../wallet/utils/leap/types/leap";
import { COSMOS_BASED_WALLETS } from "helpers/src/crypto/wallets/is-cosmos-wallet";
import { getLeapProvider } from "../../wallet/utils/leap/getLeapProvider";

type SignDirectBody = Parameters<Leap["signDirect"]>[2];
type SignDirectBodyKeplr = Parameters<Keplr["signDirect"]>[2];

interface Signer {
  (message: {
    sender: string;
    chainId: string;
    body: SignDirectBody | SignDirectBodyKeplr;
  }): Promise<DirectSignResponse | DirectSignResponseCosmjs>;
}
export const signers: { [key in COSMOS_BASED_WALLETS]: Signer } = {
  Leap: signLeapDirect,
  Keplr: signKeplrDirect,
};

export const providers: {
  [key in COSMOS_BASED_WALLETS]: () => Promise<Keplr | Leap>;
} = {
  Leap: getLeapProvider,
  Keplr: getKeplrProvider,
};
