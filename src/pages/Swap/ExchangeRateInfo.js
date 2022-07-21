import { useEffect, useMemo } from "react";
import classNames from "classnames"

import Grid from "../../components/tailwind/Grid"

export default function ExchangeRateInfo({ fromCoin, toCoin, exchangeRate, fromRef, calculateValue }) {

  let isPriceImpactNegative = 0
  let formattedPercentSlippage = 0

  if (fromRef.current?.value === "undefined" || fromRef.current?.value == "") {
  } else {
    exchangeRate = (calculateValue / Number(fromRef.current?.value)).toFixed(2)
    formattedPercentSlippage = ((calculateValue - Number(fromRef.current?.value)) / Number(fromRef.current?.value) * 100).toFixed(2)
  }

  return (
    <>
      <hr />
      <div className={classNames("py-3.5 pr-6 pl-6 rounded-b-2xl ")}>
        <Grid cols={{ xs: 1, sm: 2 }} gapY={4}>
          <div className="text-center sm:text-left">
            <p className=" text-sm font-medium opacity-70 pb-0.5">
              Price per {fromCoin.symbol}
            </p>
            <span className="text-lg sm:text-2xl font-mono font-medium">
              {exchangeRate}
            </span>
            <span className="pl-2 text-lg font-mono font-medium ">
              {toCoin.symbol}
            </span>
          </div>
          <div className='text-right sm:text-right cursor-pointer'>
            <p className=' text-sm font-medium opacity-70 pb-1.5'>
              {!isPriceImpactNegative && 'Positive '}
              Slippage
            </p>
            <span
              className={classNames('pl-2 text-lg font-medium ', {
                'ml-auto': true,
                'text-red-500': isPriceImpactNegative,
                'text-green-500': !isPriceImpactNegative,
              })}
            >
              {formattedPercentSlippage}%
            </span>
          </div>
        </Grid>
      </div>
    </>
  )
}
