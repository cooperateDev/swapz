import { POOLS_MAP, INVERTED_ROUTER_INDEX } from "../../constants"

export function getPoolStats({ poolName }) {
  const poolRouterIndex = INVERTED_ROUTER_INDEX[poolName]
  const coins = POOLS_MAP[poolName]

  const { apy, totalLockedUSD } = {}

  let fullCompoundedApyStr
  let totalLockedUSDStr = 0
  let yearlyAPRUnvestedStr

  return {
    poolRouterIndex,
    coins,
    apy,
    totalLockedUSD,
    fullCompoundedApyStr,
    yearlyAPRUnvestedStr,
    totalLockedUSDStr,
  }
}
