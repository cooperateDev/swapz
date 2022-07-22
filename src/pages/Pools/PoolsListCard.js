import { useEffect, useState } from "react"

import { Link } from "react-router-dom"

import { RUSD_POOL_NAME, METAPOOL_NAMES } from "../../constants"

import { getCardStyleByRouterIndex } from "../../utils/coinStyles"

import { getPoolUrl } from "../../utils/urls"

import Card from "../../components/tailwind/Card"
import Grid from "../../components/tailwind/Grid"

import LoadingSpinner from "../../components/LoadingSpinner"
import ApyTooltip from "../../components/ApyTooltip"
import CustomTooltip from "../../components/CustomTooltip"

import StatDisplay from "./StatDisplay"
import CoinLabels from "./CoinLabels"

import { getPoolStats } from "./getPoolStats"

import {
  getWeb3,
  getBUSDValue,
  getUSDTValue,
  getUSDCValue
} from "../../components/contracts/liquidityContract"

import {
  getApr
} from "../../components/contracts/masterMind"

export default function PoolsListCard({ poolName }) {

  const [apr, setApr] = useState()
  const [totalLiquidityUSD, setTotalLiquidityUSD] = useState()

  useEffect(() => {
    (async () => {
      const readProvider = getWeb3()
      const busdValue = await getBUSDValue(readProvider)
      const usdtValue = await getUSDTValue(readProvider)
      const usdcValue = await getUSDCValue(readProvider)
      setTotalLiquidityUSD((busdValue + usdtValue + usdcValue).toFixed(2))
      const aprTemp = await getApr(readProvider, 0)
      setApr(aprTemp)
    })()
  }, [])

  const {
    poolRouterIndex,
    coins,
    apy,
    fullCompoundedApyStr,
    yearlyAPRUnvestedStr,
    totalLockedUSDStr,
  } = getPoolStats({ poolName })

  let apyInfoObj
  if (poolName === RUSD_POOL_NAME) {
    apyInfoObj = {
      infoTooltip: fullCompoundedApyStr ?? <CustomTooltip apyData={apy} />,
      content: <a href="https://appv2.rampdefi.com">Visit Ramp to stake NRV</a>,
    }
  } else {
    apyInfoObj = {
      infoTooltip: yearlyAPRUnvestedStr && <ApyTooltip apyData={apy} />,
      content: <>{apr}%</>,
    }
  }

  return (
    <Link to={getPoolUrl({ poolRouterIndex })}>
      <Card
        title={poolName}
        className={`py-4 mt-4 items-center pr-2 text-indigo-400 ${getCardStyleByRouterIndex(
          poolRouterIndex
        )} transition-all rounded-xl`}
        divider={false}
      >
        <Grid
          gap={3}
          cols={{ xs: 1, sm: 2 }}
          className="divide-x-0 sm:divide-x "
        >
          <div>
            <h3 className="text-md text-white">Assets</h3>
            <CoinLabels coins={coins} />
          </div>
          <div>
            <StatDisplay
              className="pr-8 lg:pr-12 xl:pr-14"
              title="Total Liquidity"
              content={<>${totalLiquidityUSD}</>}
            />

            <StatDisplay title="APR" {...apyInfoObj} />
          </div>
        </Grid>
      </Card>
    </Link>
  )
}
