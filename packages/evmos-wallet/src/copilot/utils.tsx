import {
  KEPLR_KEY,
  METAMASK_KEY,
  WALLECT_CONNECT_KEY,
} from "../internal/wallet/functionality/wallet";
import { KeplrIcon, MetamaskIcon, WalletConnectIcon } from "icons";

export const ProvidersIcons: { [key: string]: JSX.Element } = {
  [METAMASK_KEY]: <MetamaskIcon />,
  [KEPLR_KEY]: <KeplrIcon />,
  [WALLECT_CONNECT_KEY]: <WalletConnectIcon />,
};
