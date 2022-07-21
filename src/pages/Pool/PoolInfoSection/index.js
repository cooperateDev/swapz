import { useEffect, useState } from "react"
import { Transition } from "@headlessui/react"

import Grid from "../../../components/tailwind/Grid"

import InfoListItem from "../../../components/InfoListItem"
import AugmentWithUnits from "../../../components/AugmentWithUnits"

import InfoSectionCard from "./InfoSectionCard"
import { POOLS_MAP } from "../../../constants"
import CurrencyReservesCard from "./CurrencyReservesCard"
import {
  getWeb3,
  getTradingFee,
  getDepositFee,
  getVirtualPrice,
  // getTotalLiquidity,
  getBUSDValue,
  getUSDTValue,
  getUSDCValue
} from "../../../components/contracts/liquidityContract"

export default function PoolInfoCard({ poolName }) {
  const totalLocked = 0
  const totalLockedUSD = 1
  const coins = POOLS_MAP[poolName]

  const [tradingFee, setTradingFee] = useState()
  const [depositFee, setDepositFee] = useState()
  const [virtualPrice, setVirtualPrice] = useState()
  // const [totalLiquidity, setTotalLiquidity] = useState()
  const [totalLiquidityUSD, setTotalLiquidityUSD] = useState()

  useEffect(() => {
    (async () => {
      const readProvider = getWeb3()
      const tradingFeeTemp = await getTradingFee(readProvider)
      setTradingFee(tradingFeeTemp)
      const DepositFeeTemp = await getDepositFee(readProvider)
      setDepositFee(DepositFeeTemp)
      const VirtualPriceTemp = await getVirtualPrice(readProvider)
      setVirtualPrice(VirtualPriceTemp.toFixed(2))
      // const TotalLiquidityTemp = await getTotalLiquidity(readProvider)
      // setTotalLiquidity(TotalLiquidityTemp)
      const busdValue = await getBUSDValue(readProvider)
      const usdtValue = await getUSDTValue(readProvider)
      const usdcValue = await getUSDCValue(readProvider)
      setTotalLiquidityUSD((busdValue + usdtValue + usdcValue).toFixed(2))

    })()
  }, [])

  return (
    <Grid cols={{ xs: 1, sm: 2 }} gap={4} className="mt-2 ">
      <div className="space-y-4">
        <InfoTransition show={true}>
          <CurrencyReservesCard tokens={coins} />
        </InfoTransition>
      </div>
      <div>
        <InfoTransition show={totalLockedUSD ? true : false}>
          <InfoSectionCard title="Pool Info">
            <InfoListItem labelText="Trading Fee" content={tradingFee + "%"} />
            <InfoListItem labelText="Deposit Fee" content={depositFee + "%"} />
            <InfoListItem labelText="Virtual Price" content={virtualPrice + " USD"} />
            <InfoListItem
              labelText="Total Liquidity"
              content={<AugmentWithUnits content={totalLiquidityUSD + " USD"} label={""} />}
            />
            <InfoListItem
              labelText="Total Liquidity USD"
              content={"$" + totalLiquidityUSD}
            />
          </InfoSectionCard>
        </InfoTransition>
      </div>
    </Grid>
  )
}

function InfoTransition({ show, children }) {
  return (
    <Transition
      show={show}
      enter="transition-all duration-75"
      enterFrom="opacity-0 scale-0"
      enterTo="opacity-100 scale-100"
      leave="transition-all duration-150"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-0"
      className="origin-center transform-gpu"
    >
      {children}
    </Transition>
  )
}
