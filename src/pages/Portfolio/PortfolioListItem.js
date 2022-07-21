import { Link } from "react-router-dom"

import {
  POOLS_MAP,
  STAKING_MAP,
  INVERTED_STAKING_MAP_TOKENS,
} from "../../constants"

import Grid from "../../components/tailwind/Grid"

import BalanceSection from "./BalanceSection"
import StakedBalanceSection from "./StakedBalanceSection"

export default function PortfolioListItem({
  token,
  stakeLinkTo,
  getBalanceLinkToUrl,
  getTitleLinkTo,
}) {
  const symbol = token.symbol
  const poolName = INVERTED_STAKING_MAP_TOKENS[token.symbol]

  let poolId, coins
  if (poolName) {
    poolId = STAKING_MAP[poolName]
    coins = POOLS_MAP[poolName]
  } else {
    poolId = -1
  }

  const balanceLinkTo = getBalanceLinkToUrl?.({ token })

  // console.log({poolId, symbol, poolName })
  let iconDisplay
  if (coins) {
    iconDisplay = (
      <div className="inline-block ml-2 ">
        {coins.map((coin, key) => (
          <img
            className="relative -ml-2 inline-block text-white shadow-solid w-5 h-5 -mt-1"
            src={coin.icon}
            key={key}
          />
        ))}
      </div>
    )
  } else {
    iconDisplay = <img src={token.icon} className="w-5 h-5 inline mr-2 -mt-1" />
  }
  const symbolContent = (
    <span className="text-md font-medium mr-2">{symbol}</span>
  )

  let symbolDisplay
  if (getTitleLinkTo) {
    const titleLinkClassName = "text-purple-700 hover:text-blue-500"
    const titleHref = getTitleLinkTo({ token })
    if (titleHref[0] === "/") {
      symbolDisplay = (
        <Link to={titleHref} className={titleLinkClassName}>
          {symbolContent}
        </Link>
      )
    } else {
      symbolDisplay = (
        <a href={titleHref} className={titleLinkClassName} target="_blank">
          {symbolContent}
        </a>
      )
    }
  } else {
    symbolDisplay = <span className="text-blue-600">{symbolContent}</span>
  }

  return (
    <li className="ml-auto py-2">
      <Grid gap={2} cols={{ xs: 1, sm: 2 }}>
        <div className="self-center">
          <div>
            {symbolDisplay}
            {iconDisplay}
          </div>
          <div>
            <small className="text-white">{token.name}</small>
          </div>
        </div>
        <div className="h-full w-full self-center">
          <div>
            <BalanceSection label="Total Balance" linkTo={balanceLinkTo} />
            {poolId > -1 && <StakedBalanceSection stakeLinkTo={stakeLinkTo} />}
          </div>
        </div>
      </Grid>
    </li>
  )
}
