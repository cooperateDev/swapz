import InfoListItem from "../../../components/InfoListItem"
import LabelWrapper from "../../../components/LabelWrapper"
import AssetDropdown from "../../../components/AssetDropdown"

import btcLogo from "../../../assets/icons/btc.svg"
import bscLogo from "../../../assets/icons/binance.svg"
import ethLogo from "../../../assets/icons/eth.svg"
import METAMASK_ICON from "../../../assets/icons/metamask.svg"

export default function DepositAssetSection({
  onSelectCoin,
  targetCoin,
  coins,
  destinationAsset,
  destinationNetwork,
}) {
  return (
    <>
      <div className="text-center px-3 pt-3 pb-1 place-items-center prose">
        Select an asset and destination chain to bridge assets to
      </div>
      <div className="w-48 sm:w-80 h-12 ">
        <AssetDropdown
          coins={coins}
          onSelectCoin={onSelectCoin}
          targetCoin={targetCoin}
        />
      </div>
      <div className="-mx-12">
        <InfoListItem
          labelText={
            <LabelWrapper
              labelText="Source Chain"
              content={`Resulting ${destinationAsset.symbol} tokens will be on the ${destinationNetwork} Network`}
            />
          }
          content={
            destinationAsset.symbol === "anyBTC" ? (
              <div>
                BTC
                <img src={btcLogo} className="w-4 h-4 inline mr-1 ml-1" />
              </div>
            ) : (
              <div>
                ETH
                <img src={ethLogo} className="w-4 h-4 inline mr-1 ml-1" />
              </div>
            )
          }
        />
        <InfoListItem
          labelText={
            <LabelWrapper
              labelText="Destination Chain"
              content={`Resulting ${destinationAsset.symbol} tokens will be on the ${destinationNetwork} Network`}
            />
          }
          content={
            <>
              {destinationNetwork}
              <img src={bscLogo} className="w-4 h-4 inline mr-1 ml-1" />
            </>
          }
        />
        <InfoListItem
          labelText={
            <LabelWrapper
              labelText="Resulting Token"
              content={`Destination ${destinationAsset.symbol}`}
            />
          }
          content={
            <>
              <div className="float-left absolute ml-16 -mt-0.5 pl-2">
                <button
                  className={`px-2 group border-gray-50 hover:border-gray-200 active:border-gray-300 rounded-full focus:ring-0 active:ring-0 outline-none transform-gpu transition duration-500 ease-in-out`}
                >
                  <img src={METAMASK_ICON} className="h-6 w-6 inline" />
                </button>
              </div>
              {destinationAsset.symbol}
              <img
                src={destinationAsset.icon}
                className="w-4 h-4 inline mr-1 ml-1"
              />
            </>
          }
        />
      </div>
    </>
  )
}
