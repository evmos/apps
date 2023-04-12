import DiffusionFinance from "../../common/images/twitter/DiffusionFinance.jpeg";
import SpaceFi from "../../common/images/twitter/SpaceFi.png";
import Coslend from "../../common/images/twitter/Coslend.jpeg";
import BandProtocol from "../../common/images/twitter/BandProtocol.jpeg";
import OrbitalApesNFT from "../../common/images/twitter/OrbitalApesNFT.jpeg";
import EvmOSPunks from "../../common/images/twitter/EvmOSPunks.jpeg";
import FluxProtocol from "../../common/images/twitter/FluxProtocol.jpeg";
import Forbole from "../../common/images/twitter/Forbole.jpeg";
import MidasCapital from "../../common/images/twitter/MidasCapital.jpeg";
import Mintscan from "../../common/images/twitter/Mintscan.jpeg";
import EvmosExplorers from "../../common/images/twitter/EvmosExplorers.jpeg";
import CronusFinance from "../../common/images/twitter/CronusFinance.jpeg";
import Multitransfer from "../../common/images/twitter/Multitransfer.jpeg";
import DIA from "../../common/images/twitter/DIA.jpeg";

type dataApps = {
  name: string;
  twitter: string;
  image: string;
  category: string;
};

export type appsOnEvmos = {
  appsOnEvmos: dataApps[];
};

export const MISSION_CONTROL_DATA: appsOnEvmos = {
  appsOnEvmos: [
    {
      name: "Diffusion Finance",
      twitter: "https://twitter.com/diffusion_fi",
      image: DiffusionFinance.src,
      category: "DeFi",
    },
    {
      name: "SpaceFi",
      twitter: "https://twitter.com/spacefi_io",
      image: SpaceFi.src,
      category: "DeFi",
    },
    {
      name: "Coslend",
      twitter: "https://twitter.com/coslend",
      image: Coslend.src,
      category: "DeFi",
    },
    {
      name: "Band Protocol",
      twitter: "https://twitter.com/BandProtocol",
      image: BandProtocol.src,
      category: "Infrastructure",
    },
    {
      name: "Orbital Apes NFT",
      twitter: "https://twitter.com/OrbitalApes",
      image: OrbitalApesNFT.src,
      category: "Collectibles",
    },
    {
      name: "EvmOS Punks",
      twitter: "https://twitter.com/EvmOSPunks",
      image: EvmOSPunks.src,
      category: "Collectibles",
    },
    {
      name: "Flux Protocol",
      twitter: "https://twitter.com/fluxprotocol",
      image: FluxProtocol.src,
      category: "Infrastructure",
    },
    {
      name: "Forbole",
      twitter: "https://twitter.com/forbole",
      image: Forbole.src,
      category: "Infrastructure",
    },
    {
      name: "Midas Capital",
      twitter: "https://twitter.com/MidasCapitalXYZ",
      image: MidasCapital.src,
      category: "DeFi",
    },
    {
      name: "Mintscan",
      twitter: "https://twitter.com/mintscanio",
      image: Mintscan.src,
      category: "Infrastructure",
    },
    {
      name: "Evmos Explorers",
      twitter: "https://twitter.com/evmosexplorers",
      image: EvmosExplorers.src,
      category: "Collectibles",
    },
    {
      name: "Cronus Finance",
      twitter: "https://twitter.com/CronusFinance",
      image: CronusFinance.src,
      category: "DeFi",
    },
    {
      name: "Multitransfer",
      twitter: "https://twitter.com/Multitransfer1",
      image: Multitransfer.src,
      category: "Infrastructure",
    },
    {
      name: "DIA",
      twitter: "https://twitter.com/DIAdata_org",
      image: DIA.src,
      category: "Infrastructure",
    },
  ],
};
