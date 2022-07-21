import { useEffect, useState } from "react"
import { SWAPABLE_TOKENS_MAP } from "../../../constants"

import InfoListItem from "../../../components/InfoListItem"
import AugmentWithUnits from "../../../components/AugmentWithUnits"
import InfoSectionCard from "./InfoSectionCard"
import {
  getWeb3,
  getBUSDValue,
  getUSDTValue,
  getUSDCValue,
} from "../../../components/contracts/liquidityContract"

export default function CurrencyReservesCard({ tokens }) {
  return (
    <InfoSectionCard title="Currency Reserves">
      {tokens.map((token, idx) => (
        <CurrencyInfoListItem {...token} key={idx} />
      ))}
    </InfoSectionCard>
  )
}

function CurrencyInfoListItem({ symbol }) {
  const { name, icon } = SWAPABLE_TOKENS_MAP[symbol]

  const [value, setValue] = useState()
  const [percent, setPercentage] = useState()

  useEffect(() => {
    (async () => {
      const readProvider = getWeb3()
      const busdValue = await getBUSDValue(readProvider)
      const usdtValue = await getUSDTValue(readProvider)
      const usdcValue = await getUSDCValue(readProvider)
      const busdPercentage = (busdValue === 0 ? 0 : (busdValue / (busdValue + usdtValue + usdcValue) * 100))
      const usdtPercentage = (usdtValue === 0 ? 0 : (usdtValue / (busdValue + usdtValue + usdcValue) * 100))
      const usdcPercentage = (usdcValue === 0 ? 0 : (usdcValue / (busdValue + usdtValue + usdcValue) * 100))

      switch (symbol) {
        case "BUSD":
          setValue(busdValue.toFixed(2));
          setPercentage(busdPercentage.toFixed(2))
          break;
        case "USDT":
          setValue(usdtValue.toFixed(2));
          setPercentage(usdtPercentage.toFixed(2))
          break;
        case "USDC":
          setValue(usdcValue.toFixed(2));
          setPercentage(usdcPercentage.toFixed(2))
          break;
        default:
          break;
      }
    })()
  }, [])

  return (
    <InfoListItem
      labelText={
        <div className="inline-flex items-center">
          <img
            className="relative text-white shadow-solid w-6 mr-2"
            src={icon}
          />
          <div>
            <div>{name}</div>
            <div className="font-medium">{percent}%</div>
          </div>
        </div>
      }
      content={<AugmentWithUnits content={value} label={symbol} />}
    />
  )
}
