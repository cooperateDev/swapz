import { InformationCircleIcon } from "@heroicons/react/outline"

import Tooltip from "../components/tailwind/Tooltip"

export default function ApyTooltip({dailyApr, weeklyApr, yearlyApr}) {
  // const fullCompoundedApy = 0
  // const weeklyApr = 0
  // const dailyApr = Math.round((0 / 7) * 100) / 100
  // const yearlyApr = Math.round(0 * 52 * 100) / 100

  return (
    <Tooltip
      // title="2/3 of rewards vest for 6 months"
      content={
        <div className="space-x-2">
          <div className="inline-block text-gray-100">
            <div>Daily APR</div>
            <div>Weekly APR</div>
            <div>Yearly APR</div>
            {/* <div>Yearly APY</div> */}
          </div>
          <div className="inline-block font-medium text-right float-right">
            <div>{dailyApr}%</div>
            <div>{weeklyApr}%</div>
            <div>{yearlyApr}%</div>
            {/* <div>{fixNumberToPercentageString(fullCompoundedApy)}</div> */}
          </div>
        </div>
      }
    >
      <InformationCircleIcon className="w-4 h-4 inline mx-1 -mt-0.5 text-gray-400 hover:text-gray-600" />
    </Tooltip>
  )
}

function fixNumberToPercentageString(num) {
  return <>{num?.toFixed(2)}%</>
}
