import {
  changeNetworkToEvmosMainnet,
  getWallet,
  isMetamaskInstalled,
  isEthChain,
  connectHandler,
  queryPubKey,
  isWalletSelected,
} from "evmos-wallet";

const metamaskDownloadUrl = "https://metamask.io/download/";

const getWalletLocal = async () => {
  // get wallet returns null or string but
  // the step actions need to return a boolean
  const wallet = await getWallet();
  if (wallet === null) {
    return false;
  }

  return true;
};

const signPubkey = async () => {
  const wallet = await getWallet();
  if (wallet === null) {
    return false;
  }

  return await connectHandler([wallet]);
};

const checkConnectionMetamask = async () => {
  const ethChain = isEthChain();
  if (!ethChain) {
    return false;
  }
  //   console.log(ethChain);
  // avoid showing the pop up if the user didn't connect the wallet yet
  const walletSelected = isWalletSelected();
  if (!walletSelected) {
    return false;
  }

  // get the wallet to query the pubkey
  const account = await getWallet();
  if (account === null) {
    return false;
  }

  // only show metamask connected if the pubkey is setted
  const pubkey = await queryPubKey("https://rest.bd.evmos.org:1317", account);
  if (pubkey === null) {
    return false;
  }

  return true;
};

const connectMematMask = (href: string) => {
  if (!isMetamaskInstalled()) {
    window.open(href, "_blank");
    return false;
  }
  return true;
};

// const setNetwork = async () => {
//   const switched = await switchEthereumChain("0x2329");
//   if (switched) {
//     console.log("entre a switched", switched);
//     return true;
//   }

//   const added = await addEthereumChain();
//   // const changed = await changeNetworkToEvmosMainnet();
//   if (added) {
//     console.log("entre a added", added);
//     return true;
//   }
//   return false;
// };

// if href is defined it means that we are going to redirect to a different page
// and the useEffect will call the visibilityChange.
// set it undefined if you don't want to call visibilityChange

export const stepsSetAccount = [
  {
    id: "install",
    name: "Install MetaMask",
    checkAction: () => isMetamaskInstalled(),
    loading: ["Waiting for MetaMask Setup"],
    done: "Metamask Installed",
    actions: [() => connectMematMask(metamaskDownloadUrl)],
    href: metamaskDownloadUrl,
  },

  {
    id: "connect",
    name: "Connect with MetaMask",
    checkAction: () => checkConnectionMetamask(),
    loading: [
      "Approve on Metamask",
      "Select accounts and press Connect",
      "Press Sign",
    ],
    actions: [
      () => changeNetworkToEvmosMainnet(),
      () => getWalletLocal(),
      () => signPubkey(),
    ],
    errors: [
      "Approval Rejected, please try again",
      "Get accounts rejected, please try again",
      "Sign rejected, please try again",
    ],
    done: "Metamask Connected",
  },
];
