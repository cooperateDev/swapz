import DepositDisplay from "./DepositDisplay"
import { POOLS_MAP } from "../../constants"
import React, { useMemo } from "react"

export default function PoolManagement(props) {
  const poolTokens = POOLS_MAP[props.poolName]
  const tokenRefs = useMemo(
    () =>
      Array(poolTokens.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )
  const tokens = poolTokens.map(({ symbol, name, icon }, key) => ({
    symbol,
    name,
    icon,
    max: 0,
    inputValue: "",
    tokenRef: tokenRefs[key],
  }))

  return <DepositDisplay props={props} tokens={tokens} poolTokens={poolTokens} />
}
