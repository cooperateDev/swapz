import {
  LockClosedIcon,
  RefreshIcon,
  PresentationChartBarIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/outline"

import Grid from "../../components/tailwind/Grid"

import StatCard from "./StatCard"

const DEFAULT_TOTAL_VOLUME_TRADED = 1770000000

export default function StatisticsBar() {
  let partialFmtTvl = 0
  let nrvMarketCap = 0
  let swapPoolTvl = 1
  let xNrvTvl = 1
  let nrvPrice = 1

  return (
    <Grid
      gap={4}
      cols={{ xs: 1, sm: 3 }}
      className="pb-4 sm:pb-0 sm:place-items-center"
    >
      <StatCard
        label="Total Value Locked"
        content={<StatDollarContent value={partialFmtTvl} />}
        IconComponent={LockClosedIcon}
      />
      <StatCard
        label="Total Volume Traded"
        content={<StatDollarContent value={DEFAULT_TOTAL_VOLUME_TRADED} />}
        IconComponent={RefreshIcon}
      />
      <StatCard
        label="$NRV Market Cap"
        content={<StatDollarContent value={nrvMarketCap} />}
        IconComponent={PresentationChartBarIcon}
      />
      {swapPoolTvl && (
        <StatCard
          label="In Stable Swap Pools"
          content={<StatDollarContent value={swapPoolTvl} />}
          IconComponent={SparklesIcon}
        />
      )}
      {xNrvTvl && (
        <StatCard
          label="xNRV Staked"
          content={<StatDollarContent value={xNrvTvl} />}
          IconComponent={ShieldCheckIcon}
        />
      )}
      {nrvPrice && (
        <StatCard
          label="NRV Price"
          content={<StatDollarContent value={nrvPrice} />}
          IconComponent={CurrencyDollarIcon}
        />
      )}
    </Grid>
  )
}

function StatDollarContent({ value }) {
  const { str, units } = formatNumber(value)

  return (
    <>
      <span className="font-normal opacity-90">$</span>
      {str}
      <span className="font-normal opacity-90">{units}</span>
    </>
  )
}

function formatNumber(num) {
  const millions = num / 1000000
  const billions = num / 1000000000

  let str
  let units
  if (billions > 1) {
    str = `${billions.toFixed(2)}`
    units = "b"
  } else if (millions >= 1) {
    str = `${Math.round(millions)}`
    units = "m"
  } else {
    str = `${num.toFixed(2)}`
    units = ""
  }

  return { str, units }
}
