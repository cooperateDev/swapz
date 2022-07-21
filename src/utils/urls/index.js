import {
  INVERTED_ROUTER_INDEX,
  INVERTED_STAKING_MAP_TOKENS,
  CAKE_LP_POOL_NAME,
} from "../../constants"

let NERVE_BASE_URL
const NODE_ENV = process.env.NODE_ENV
if (NODE_ENV === "development") {
  NERVE_BASE_URL = "http://localhost:3000"
} else {
  NERVE_BASE_URL = "https://site-test-dev.netlify.app/"
}

let NERVE_HOME_URL
if (NODE_ENV === "development") {
  NERVE_HOME_URL = "http://localhost:3000/home"
} else {
  NERVE_HOME_URL = "https://site-test-dev.netlify.app/home"
}

export { NERVE_BASE_URL, NERVE_HOME_URL }

export const SWAP_PATH = "/"
export const STAKE_PATH = "/stake"
export const XNRV_STAKING_PATH = "/nrv"
export const POOLS_PATH = "/pools"
export const BRIDGE_PATH = "/bridge"
export const CONTRACTS_PATH = "/contracts"
export const PORTFOLIO_PATH = "/portfolio"
export const STATISTICS_PATH = "/statistics"
export const CLAIM_PATH = "/claim"

export const PANCAKE_SWAP_NRV_BUSD_URL =
  "https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x42f6f551ae042cbe50c739158b4f0cac0edb9096&inputCurrency=0xe9e7cea3dedca5984780bafc599bd69add087d56"

export const PANCAKE_ADD_LIQUIDITY_NRV_BUSD_URL =
  "https://exchange.pancakeswap.finance/#/add/0x42F6f551ae042cBe50C739158b4f0CAC0Edb9096/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"

export function getPoolUrl({ symbol, token, poolName, poolRouterIndex }) {
  if (poolName === CAKE_LP_POOL_NAME) {
    return PANCAKE_ADD_LIQUIDITY_NRV_BUSD_URL
  }
  if (token) {
    symbol = symbol ?? token.symbol
  }
  if (symbol) {
    poolName = poolName ?? INVERTED_STAKING_MAP_TOKENS[symbol]
  }
  poolRouterIndex = poolRouterIndex ?? INVERTED_ROUTER_INDEX[poolName]

  return `${POOLS_PATH}/${poolRouterIndex}`
}

export const BSCSCAN_BASE_URL = "https://bscscan.com"

export function getExplorerTxUrl({ hash }) {
  return `${BSCSCAN_BASE_URL}/tx/${hash}`
}

export function getExplorerUrl() {
  return BSCSCAN_BASE_URL
}

export const NERVE_DOCS_URL = "https://docs.nerve.fi"
export const NERVE_DISCORD_URL = "https://discord.gg/4XEyjqJ2by"
export const NERVE_TELEGRAM_URL = "https://t.me/nervefinance"
export const NERVE_FORUM_URL = "https://forum.nerve.fi"
export const NERVE_TWITTER_URL = "https://twitter.com/NerveFinance"
// Patching this as docs for now need to swap w/ git link
export const NERVE_GITHUB_URL = "https://docs.nerve.fi/"

export const RAMP_DEFI_URL = "https://appv2.rampdefi.com"
