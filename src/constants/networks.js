import ethLogo from "../assets/icons/eth.svg";
import binanceLogo from "../assets/icons/binance.svg";

export const NetworkContextName = "NETWORK";

export const ChainId = {
  ETH: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  GÖRLI: 5,
  KOVAN: 42,
  BSC: 56,
  HARDHAT: 31337,
};

export const INVERTED_CHAIN_ID_MAP = Object.fromEntries(
  Object.entries(ChainId).map(([k, v]) => [v, k])
);

export const CHAIN_INFO_MAP = {
  1: {
    chainSymbol: "ETH",
    chainLogo: ethLogo,
    chainImg: ethLogo,
  },
  56: {
    chainSymbol: "BSC",
    chainLogo: binanceLogo,
    chainImg: binanceLogo,
  },
};

export const CHAIN_RPC = {
  [ChainId.ETH]:
    "https://eth-mainnet.alchemyapi.io/v2/q1gSNoSMEzJms47Qn93f9-9Xg5clkmEC",
  [ChainId.ROPSTEN]:
    "https://eth-ropsten.alchemyapi.io/v2/cidKix2Xr-snU3f6f6Zjq_rYdalKKHmW",
  [ChainId.RINKEBY]:
    "https://eth-rinkeby.alchemyapi.io/v2/XVLwDlhGP6ApBXFz_lfv0aZ6VmurWhYD",
  [ChainId.GÖRLI]:
    "https://eth-goerli.alchemyapi.io/v2/Dkk5d02QjttYEoGmhZnJG37rKt8Yl3Im",
  [ChainId.KOVAN]:
    "https://eth-kovan.alchemyapi.io/v2/6OVAa_B_rypWWl9HqtiYK26IRxXiYqER",
  [ChainId.BSC]: "https://bsc-dataseed.binance.org/",
};

export const CHAIN_PARAMS = {
  [ChainId.ETH]: {
    chainId: "0x1",
    chainName: "Ethereum",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: [CHAIN_RPC[ChainId.ETH]], // ['https://mainnet.infura.io/v3'],
    blockExplorerUrls: ["https://etherscan.com"],
  },
  [ChainId.BSC]: {
    chainId: "0x38",
    chainName: "Binance Smart Chain",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: [CHAIN_RPC[ChainId.BSC]], // ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  [ChainId.MATIC]: {
    chainId: "0x89",
    chainName: "Matic",
    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mainnet.maticvigil.com"],
    blockExplorerUrls: ["https://explorer-mainnet.maticvigil.com"],
  },
};
