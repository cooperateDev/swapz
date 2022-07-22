import React, { useState, useMemo } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import PoolManagementDeposit from "../../components/PoolManagementDeposit"
import PoolManagementWithdraw from "../../components/PoolManagementWithdraw"
import PoolStakingButton from "../../components/PoolStakingButton"

import LiquidityManagementTabs from "./LiquidityManagementTabs"

export default function DepositDisplay({
  tokens,
  poolTokens,
  props
}) {
  const location = useLocation()
  const navigate = useNavigate()

  const tokenRefs = useMemo(
    () =>
      Array(poolTokens.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const [cardNav, setCardNav] = useState(getLiquidityMode(location.hash)) // 'addLiquidity'

  const withdrawTokens = poolTokens.map(({ name, symbol, icon }, key) => ({
    name,
    symbol,
    icon,
    inputValue: "",
    tokenRef: tokenRefs[key],
  }))

  return (
    <div>
      <div className="rounded-lg  text-default">
        <LiquidityManagementTabs
          cardNav={cardNav}
          setCardNav={(val) => {
            navigate(`#${val}`)
            setCardNav(val)
          }}
        />
        <div className="mt-4">
          {cardNav === "addLiquidity" && (
            <PoolManagementDeposit tokens={tokens} />
          )}
          {cardNav === "removeLiquidity" && (
            <PoolManagementWithdraw tokens={withdrawTokens} />
          )}
        </div>
      </div>
      {props.poolStakingLink && (
        <PoolStakingButton
          poolName={props.poolName}
          poolStakingLink={props.poolStakingLink}
          poolStakingLinkText={props.poolStakingLinkText}
        />
      )}
    </div>
  )
}

function getLiquidityMode(browserHash) {
  switch (browserHash) {
    case "#addLiquidity":
      return "addLiquidity"
    case "#removeLiquidity":
      return "removeLiquidity"
    default:
      return "addLiquidity"
  }
}
