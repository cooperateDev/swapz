import { ChainId } from "../constants/networks"

import busdLogo from "../assets/icons/busd.svg"
import usdcLogo from "../assets/icons/usdc.svg"
import usdtLogo from "../assets/icons/usdt.svg"
import pancakeLogo from "../assets/icons/pancake.svg"
import ethLogo from "../assets/icons/eth.svg"
import ethBepLogo from "../assets/icons/ethbep.svg"
import btcLogo from "../assets/icons/btc.svg"
import btcBepLogo from "../assets/icons/btcbep.svg"
import anyBtcLogo from "../assets/icons/anybtc.svg"
import rampLogo from "../assets/icons/ramp.svg"
import ustLogo from "../assets/icons/ust.svg"
import nerveLogo from "../assets/icons/logo.svg"

export const STABLECOIN_POOL_NAME = "Stablecoin 3Pool"
export const NRVBTC_POOL_NAME = "BTCB/anyBTC Pool"
export const NRVETH_POOL_NAME = "ETH/anyETH Pool"
export const RUSD_POOL_NAME = "rUSD / 3pool - External Metapool"
export const FUSDT_POOL_NAME = "fUSDT Metapool"
export const UST_POOL_NAME = "UST Metapool"
export const XNERVE_POOL_NAME = "xNRV"
export const CAKE_LP_POOL_NAME = "NRV/BUSD Cake-LP Pool"

export const ROUTER_INDEX = {
  "3pool": STABLECOIN_POOL_NAME,
  anyBTC: NRVBTC_POOL_NAME,
  anyETH: NRVETH_POOL_NAME,
  rusd: RUSD_POOL_NAME,
  fusdt: FUSDT_POOL_NAME,
  ust: UST_POOL_NAME,
}

export const INVERTED_ROUTER_INDEX = Object.fromEntries(
  Object.entries(ROUTER_INDEX).map(([k, v]) => [v, k])
)

export const PRICE_UNITS_INDEX = {
  [STABLECOIN_POOL_NAME]: "USD",
  [RUSD_POOL_NAME]: "USD",
  [FUSDT_POOL_NAME]: "USD",
  [UST_POOL_NAME]: "USD",
  [NRVBTC_POOL_NAME]: "BTC",
  [NRVETH_POOL_NAME]: "ETH",
}

export const BLOCK_TIME = 2500

export class Token {
  constructor(addresses, decimals, symbol, name, icon) {
    this.addresses = addresses
    this.decimals = decimals
    this.symbol = symbol
    this.name = name
    this.icon = icon
  }
}

// Stablecoin Swap
export const STABLECOIN_SWAP_ADDRESSES = {
  [ChainId.BSC]: "0x1B3771a66ee31180906972580adE9b81AFc5fCDc",
  [ChainId.HARDHAT]: "0x59b670e9fA9D0A427751Af201D676719a970857b",
}

export const STABLE_SWAP_TOKEN_ADDRESSES = {
  [ChainId.BSC]: "0x4c86ba408Ade1dF2397a7Fb9d56b0D50ce8E1502",
  [ChainId.HARDHAT]: "0x4c86ba408Ade1dF2397a7Fb9d56b0D50ce8E1502",
}

export const TOKEN_DIST_ADDRESSES = {
  [ChainId.BSC]: "0x36829ba54e6a0f11fb6e5a45ac5ad2742ec86a0b",
}

export const TOKEN_DIST_ADDRESSES2 = {
  [ChainId.BSC]: "0x73e2608789111eed6fa675cf17770b232bf04780",
}

export const STABLE_SWAP_TOKEN = new Token(
  STABLE_SWAP_TOKEN_ADDRESSES,
  18,
  "3SWAPZ-LP",
  "SWAPZ 3Pool LP Token",
  nerveLogo
)

// Bitcoin Swap
export const NRVBTC_SWAP_ADDRESSES = {
  [ChainId.BSC]: "0x6C341938bB75dDe823FAAfe7f446925c66E6270c",
  [ChainId.HARDHAT]: "0x7a2088a1bFc9d81c55368AE168C2C02570cB814F",
}

export const NRVBTC_ADDRESSES = {
  [ChainId.BSC]: "0xD1D5Af92C606C6F2eC59D453f57A6FCc188D7dB5",
  [ChainId.HARDHAT]: "0xDC17C27Ae8bE831AF07CC38C02930007060020F4",
}

export const NRVBTC_SWAP_TOKEN = new Token(
  NRVBTC_ADDRESSES,
  18,
  "nrvBTC",
  "Nerve anyBTC/BTCB LP",
  nerveLogo
)

// ETH Swap
export const NRVETH_SWAP_ADDRESSES = {
  [ChainId.BSC]: "0x146CD24dCc9f4EB224DFd010c5Bf2b0D25aFA9C0",
  [ChainId.HARDHAT]: "0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690",
}

export const NRVETH_ADDRESSES = {
  [ChainId.BSC]: "0x0d283BF16A9bdE49cfC48d8dc050AF28b71bdD90",
  [ChainId.HARDHAT]: "0xa37aE2b259D35aF4aBdde122eC90B204323ED304",
}

export const NRVETH_SWAP_TOKEN = new Token(
  NRVETH_ADDRESSES,
  18,
  "nrvETH",
  "Nerve anyETH/ETH LP",
  nerveLogo
)

// 3Pool Stables

const BUSD_CONTRACT_ADDRESSES = {
  [ChainId.BSC]: "0x334F16dd7ede5F552a40342D045BB54aEFDdD6DB",
  [ChainId.HARDHAT]: "0x334F16dd7ede5F552a40342D045BB54aEFDdD6DB",
}
export const BUSD = new Token(
  BUSD_CONTRACT_ADDRESSES,
  18,
  "BUSD",
  "Binance USD",
  busdLogo,
)

const USDC_CONTRACT_ADDRESSES = {
  [ChainId.BSC]: "0xcBA912F1388e6fA7Ae8dD6f387073d7801Fb9DE9",
  [ChainId.HARDHAT]: "0xcBA912F1388e6fA7Ae8dD6f387073d7801Fb9DE9",
}

export const USDC = new Token(
  USDC_CONTRACT_ADDRESSES,
  18,
  "USDC",
  "USD Circle",
  usdcLogo
)

const USDT_CONTRACT_ADDRESSES = {
  [ChainId.BSC]: "0x051d4AB215ec7Af84A5f7592C21d76129bECaA4d",
  [ChainId.HARDHAT]: "0x051d4AB215ec7Af84A5f7592C21d76129bECaA4d",
}

export const USDT = new Token(
  USDT_CONTRACT_ADDRESSES,
  18,
  "USDT",
  "USD Tether",
  usdtLogo
)

// RUSD Swap
export const RUSD_SWAP_ADDRESSES = {
  [ChainId.BSC]: "0x0eafaa7ed9866c1f08ac21dd0ef3395e910f7114",
  [ChainId.HARDHAT]: "0x7a2088a1bFc9d81c55368AE168C2C02570cB814F",
}

export const RUSD_SWAP_DEPOSIT_ADDRESSES = {
  [ChainId.BSC]: "0xeae67462d058148df58e20054657d864dd37cefc",
  [ChainId.HARDHAT]: "0xeae67462d058148df58e20054657d864dd37cefc",
}

export const NRVRUSD_ADDRESSES = {
  [ChainId.BSC]: "0x870ee4d19c12a789c61de69e3e5efb42383e4434",
  [ChainId.HARDHAT]: "0x870ee4d19c12a789c61de69e3e5efb42383e4434",
}

export const RUSD_SWAP_TOKEN = new Token(
  NRVRUSD_ADDRESSES,
  18,
  "nrvRUSD",
  "Nerve rUSD Metapool LP",
  nerveLogo
)

// RUSD Swap
export const FUSDT_SWAP_ADDRESSES = {
  [ChainId.BSC]: "0xd0fBF0A224563D5fFc8A57e4fdA6Ae080EbCf3D3",
  [ChainId.HARDHAT]: "0x7a2088a1bFc9d81c55368AE168C2C02570cB814F",
}

export const FUSDT_SWAP_DEPOSIT_ADDRESSES = {
  [ChainId.BSC]: "0xC924A8a789d7FafD089cc285e2546FC851b0942c",
  [ChainId.HARDHAT]: "0xeae67462d058148df58e20054657d864dd37cefc",
}

export const NRVFUSDT_ADDRESSES = {
  [ChainId.BSC]: "0x2e91a0cecf28c5e518bb2e7fdcd9f8e2cd511c10",
  [ChainId.HARDHAT]: "0x870ee4d19c12a789c61de69e3e5efb42383e4434",
}

export const FUSDT_SWAP_TOKEN = new Token(
  NRVFUSDT_ADDRESSES,
  18,
  "nrvFUSDT",
  "Nerve fUSDT Metapool LP",
  nerveLogo
)

const RUSD_CONTRACT_ADDRESSES = {
  [ChainId.BSC]: "0x07663837218a003e66310a01596af4bf4e44623d",
  [ChainId.HARDHAT]: "0x07663837218a003e66310a01596af4bf4e44623d",
}

export const RUSD = new Token(
  RUSD_CONTRACT_ADDRESSES,
  18,
  "rUSD",
  "Ramp USD",
  rampLogo
)

// UST Swap
export const UST_SWAP_ADDRESSES = {
  [ChainId.BSC]: "0x2dcCe1586b1664f41C72206900e404Ec3cA130e0",
  [ChainId.HARDHAT]: "0x7a2088a1bFc9d81c55368AE168C2C02570cB814F",
}

export const UST_SWAP_DEPOSIT_ADDRESSES = {
  [ChainId.BSC]: "0x39990Cb7a160cad6214F01D3258A6E27F71e6dc2",
  [ChainId.HARDHAT]: "0xeae67462d058148df58e20054657d864dd37cefc",
}

export const NRVUST_ADDRESSES = {
  [ChainId.BSC]: "0x35ce243e0dc9ed77e3c348bb2742095f78e1cb70",
  [ChainId.HARDHAT]: "0x870ee4d19c12a789c61de69e3e5efb42383e4434",
}

export const UST_SWAP_TOKEN = new Token(
  NRVUST_ADDRESSES,
  18,
  "nrvUST",
  "Nerve UST Metapool LP",
  nerveLogo
)

const UST_CONTRACT_ADDRESSES = {
  [ChainId.BSC]: "0x23396cf899ca06c4472205fc903bdb4de249d6fc",
  [ChainId.HARDHAT]: "0x07663837218a003e66310a01596af4bf4e44623d",
}

export const UST = new Token(
  UST_CONTRACT_ADDRESSES,
  18,
  "UST",
  "TerraUSD",
  ustLogo
)

// Nerve Contracts
const NRV_CONTRACT_ADDRESSES = {
  [ChainId.BSC]: "0x4ab99FD9856f24Ea6dc421eeaae6370Cfd3Ae89e",
  [ChainId.HARDHAT]: "0x4ab99FD9856f24Ea6dc421eeaae6370Cfd3Ae89e",
}

export const NRV = new Token(
  NRV_CONTRACT_ADDRESSES,
  18,
  "SWAPZ",
  "SWAPZ",
  nerveLogo
)

export const XNERVE_CONTRACT_ADDRESSES = {
  [ChainId.BSC]: "0x120c120bA7ac52fd5c1145310aC9C1e697482773",
  [ChainId.HARDHAT]: "0x120c120bA7ac52fd5c1145310aC9C1e697482773",
}

export const XNERVE_TOKEN = new Token(
  XNERVE_CONTRACT_ADDRESSES,
  18,
  "xSWAPZ",
  "xSWAPZ",
  nerveLogo
)

export const NRV_BUSD_CAKE_V2_NEW_LP_TOKEN_ADDRESSES = {
  [ChainId.BSC]: "0x401479091d0f7b8ae437ee8b054575cd33ea72bd",
  [ChainId.HARDHAT]: "0x401479091d0f7b8ae437ee8b054575cd33ea72bd",
}

export const NRV_BUSD_CAKE_TOKEN = new Token(
  NRV_BUSD_CAKE_V2_NEW_LP_TOKEN_ADDRESSES,
  18,
  "Cake-LP V2",
  "NRV/BUSD Cake-LP V2",
  pancakeLogo
)

export const MASTERMIND_ADDRESSES = {
  [ChainId.BSC]: "0x2EBe8CDbCB5fB8564bC45999DAb8DA264E31f24E",
  [ChainId.HARDHAT]: "0x2EBe8CDbCB5fB8564bC45999DAb8DA264E31f24E",
}

export const STABLECOIN_POOL_TOKENS = [BUSD, USDT, USDC]
export const STAKING_TOKENS = [
  STABLE_SWAP_TOKEN,
  XNERVE_TOKEN,
  NRVBTC_SWAP_TOKEN,
  NRVETH_SWAP_TOKEN,
  NRV_BUSD_CAKE_TOKEN,
  FUSDT_SWAP_TOKEN,
  UST_SWAP_TOKEN,
]

export const STAKING_TOKEN_MAP = STAKING_TOKENS.concat(STAKING_TOKENS).reduce(
  (acc, token) => ({ ...acc, [token.symbol]: token }),
  {}
)

export const POOL_FEE_PRECISION = 10

// The numbers in staking maps are significant contract wise, do npt fuck with them
export const STAKING_MAP = {
  [STABLECOIN_POOL_NAME]: 0,
  [XNERVE_POOL_NAME]: 2,
  [NRVBTC_POOL_NAME]: 4,
  [NRVETH_POOL_NAME]: 5,
  [CAKE_LP_POOL_NAME]: 7,
  [FUSDT_POOL_NAME]: 9,
  [UST_POOL_NAME]: 10,
}

export const STAKING_MAP_TOKENS = {
  [STABLECOIN_POOL_NAME]: STABLE_SWAP_TOKEN,
  [XNERVE_POOL_NAME]: XNERVE_TOKEN,
  [NRVBTC_POOL_NAME]: NRVBTC_SWAP_TOKEN,
  [NRVETH_POOL_NAME]: NRVETH_SWAP_TOKEN,
  [CAKE_LP_POOL_NAME]: NRV_BUSD_CAKE_TOKEN,
  [FUSDT_POOL_NAME]: FUSDT_SWAP_TOKEN,
  [UST_POOL_NAME]: UST_SWAP_TOKEN,
}

export const INVERTED_STAKING_MAP_TOKENS = Object.fromEntries(
  Object.entries(STAKING_MAP_TOKENS).map(([k, v]) => [v.symbol, k])
)

/* putting this here as a temporary placeholder */
export const NRV_IMG =
  "https://assets.coingecko.com/coins/images/14233/small/nerve_finance_logo.png"

// Anyswap Bridge Tokens

export const ANYETH_ADDRESSES = {
  [ChainId.BSC]: "0x6f817a0ce8f7640add3bc0c1c2298635043c2423",
  [ChainId.HARDHAT]: "0x67d269191c92Caf3cD7723F116c85e6E9bf55933",
}

export const ANYETH = new Token(
  ANYETH_ADDRESSES,
  18,
  "anyETH",
  "Anyswap Ethereum",
  ethLogo
)

export const FUSDT_ADDRESSES = {
  [ChainId.ETH]: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  [ChainId.BSC]: "0x049d68029688eabf473097a2fc38ef61633a3c7a",
  [ChainId.HARDHAT]: "0x049d68029688eabf473097a2fc38ef61633a3c7a",
}

export const FUSDT = new Token(
  FUSDT_ADDRESSES,
  6,
  "fUSDT",
  "Frapped USDT",
  usdtLogo
)

export const ANYBTC_ADDRESSES = {
  [ChainId.BSC]: "0x54261774905f3e6e9718f2abb10ed6555cae308a",
  [ChainId.HARDHAT]: "0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f",
}

export const ANYBTC = new Token(
  ANYBTC_ADDRESSES,
  8,
  "anyBTC",
  "Anyswap BTC",
  anyBtcLogo
)

export const BSC_BRIDGE_TOKENS = [ANYETH, ANYBTC]

export const ETH_BSC = new Token(
  ANYETH_ADDRESSES,
  18,
  "ETH",
  "Ethereum",
  ethLogo
)

export const USDT_BSC = new Token(
  FUSDT_ADDRESSES,
  6,
  "USDT",
  "USD Tether",
  usdtLogo
)

export const BTC_BSC = new Token(ANYBTC_ADDRESSES, 6, "BTC", "Bitcoin", btcLogo)

export const ETH_BRIDGE_TOKENS = [ETH_BSC, BTC_BSC]

export const DEPOSIT_BRIDGE_MAPPING = {
  ETH: ANYETH,
  USDT: FUSDT,
  BTC: ANYBTC,
}

export const WITHDRAW_BRIDGE_MAPPING = {
  anyETH: ETH_BSC,
  fUSDT: USDT_BSC,
  anyBTC: BTC_BSC,
}

export const BRIDGE_GOD = {
  ETH: {
    primaryAsset: ANYETH,
    bscAsset: ETH_BSC,
    nativeNetwork: {
      name: "ETH",
    },
  },
  USDT: {
    primaryAsset: FUSDT,
    bscAsset: USDT_BSC,
    nativeNetwork: {
      name: "ETH",
    },
  },
  BTC: {
    primaryAsset: ANYBTC,
    bscAsset: BTC_BSC,
    nativeNetwork: {
      name: "BTC",
    },
  },
}

export const BTCB_ADDRESSES = {
  [ChainId.BSC]: "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c",
  [ChainId.HARDHAT]: "0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1",
}

export const BTCB = new Token(BTCB_ADDRESSES, 18, "BTCB", "Bitcoin", btcBepLogo)
export const BTC_POOL_TOKENS = [BTCB, ANYBTC]

export const ETHB_ADDRESSES = {
  [ChainId.BSC]: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
  [ChainId.HARDHAT]: "0x09635F643e140090A9A8Dcd712eD6285858ceBef",
}

export const ETHB = new Token(ETHB_ADDRESSES, 18, "ETH", "Ethereum", ethBepLogo)

export const ETH_POOL_TOKENS = [ETHB, ANYETH]

export const RUSD_POOL_TOKENS = [RUSD, BUSD, USDT, USDC]
export const RUSD_METAPOOL_TOKENS = [RUSD, STABLE_SWAP_TOKEN]

export const FUSDT_POOL_TOKENS = [FUSDT, BUSD, USDT, USDC]
export const FUSDT_METAPOOL_TOKENS = [FUSDT, STABLE_SWAP_TOKEN]

export const UST_POOL_TOKENS = [UST, BUSD, USDT, USDC]
export const UST_METAPOOL_TOKENS = [UST, STABLE_SWAP_TOKEN]

export const METAPOOL_TOKENS = [RUSD, FUSDT, UST]

export const BASIC_POOLS_MAP = {
  [NRVETH_POOL_NAME]: ETH_POOL_TOKENS,
  [NRVBTC_POOL_NAME]: BTC_POOL_TOKENS,
  [STABLECOIN_POOL_NAME]: STABLECOIN_POOL_TOKENS,
}

export const METAPOOLS_MAP = {
  [RUSD_POOL_NAME]: RUSD_METAPOOL_TOKENS,
  [FUSDT_POOL_NAME]: FUSDT_METAPOOL_TOKENS,
  [UST_POOL_NAME]: UST_METAPOOL_TOKENS,
}

export const POOLS_MAP = {
  ...BASIC_POOLS_MAP,
  [RUSD_POOL_NAME]: RUSD_POOL_TOKENS,
  [FUSDT_POOL_NAME]: FUSDT_POOL_TOKENS,
  [UST_POOL_NAME]: UST_POOL_TOKENS,
}

export const BASIC_POOL_NAMES = Object.keys(BASIC_POOLS_MAP)

export const METAPOOL_NAMES = Object.keys(METAPOOLS_MAP)

export const SWAPABLE_TOKENS = [
  BUSD,
  USDT,
  USDC,
  // BTCB,
  // ANYBTC,
  // ETHB,
  // ANYETH,
  // RUSD,
  // FUSDT,
  // UST,
  // STABLE_SWAP_TOKEN,
]

export const SWAPABLE_TOKENS_MAP = SWAPABLE_TOKENS.concat(
  SWAPABLE_TOKENS
).reduce((acc, token) => ({ ...acc, [token.symbol]: token }), {})

export const ALL_TOKENS = [
  NRV,
  XNERVE_TOKEN,
  ...SWAPABLE_TOKENS,
  ...STAKING_TOKENS,
]
export const ALL_TOKENS_MAP = ALL_TOKENS.concat(ALL_TOKENS).reduce(
  (acc, token) => ({ ...acc, [token.symbol]: token }),
  {}
)

// Responsible for handling swap state
export const METAPOOL_ONLY_TOKENS = [RUSD, FUSDT, UST]

const STANDARD_STABLECOIN_POOL_RANKING = [
  STABLECOIN_POOL_NAME,
  RUSD_POOL_NAME,
  FUSDT_POOL_NAME,
  UST_POOL_NAME,
]

export const PRIORITY_RANKING = {
  [BUSD.symbol]: STANDARD_STABLECOIN_POOL_RANKING,
  [USDC.symbol]: STANDARD_STABLECOIN_POOL_RANKING,
  [USDT.symbol]: STANDARD_STABLECOIN_POOL_RANKING,
  [RUSD.symbol]: [RUSD_POOL_NAME],
  [FUSDT.symbol]: [FUSDT_POOL_NAME],
  [UST.symbol]: [UST_POOL_NAME],
  [ANYETH.symbol]: [NRVETH_POOL_NAME],
  [ETHB.symbol]: [NRVETH_POOL_NAME],
  [ANYBTC.symbol]: [NRVBTC_POOL_NAME],
  [BTCB.symbol]: [NRVBTC_POOL_NAME],
}

// Contract Events currently used in the statistics page
export const CONTRACT_EVENTS = {
  TokenSwap: "c6c1e0630dbe9130cc068028486c0d118ddcea348550819defd5cb8c257f8a38",
}
