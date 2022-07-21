import _ from "lodash"

import { useState } from "react"

import { BRIDGE_GOD } from "../../../constants"

import Grid from "../../../components/tailwind/Grid"

import BaseButton from "../../../components/BaseButton"

import { STEPS } from "../globals"

import FeeAndConfirm from "./FeeAndConfirm"
import WithdrawAssetSection from "./WithdrawAssetSection"

export default function WithdrawContent() {
  const [sendingCoinType, setSendingCoinType] = useState("ETH")
  const [destinationNetwork, setDestinationNetwork] = useState("ETH")

  const [step, setStep] = useState(STEPS.ASSET_SELECTION)

  const { primaryAsset, bscAsset } = BRIDGE_GOD[sendingCoinType]

  const primaryAssets = _.entries(BRIDGE_GOD).map(
    ([key, value]) => value.primaryAsset
  )
  // const bscAssets = _.entries(BRIDGE_GOD).map(([key, value]) => value.bscAsset);

  function onClickNextStep() {
    if (step === STEPS.ASSET_SELECTION) {
      setStep(STEPS.FEES_AND_CONFIRM)
    }
  }

  function onSelectPrimaryCoin(coin) {
    for (const [key, targetedPair] of _.entries(BRIDGE_GOD)) {
      if (targetedPair.primaryAsset.symbol === coin.symbol) {
        setDestinationNetwork(targetedPair.nativeNetwork.name)
        setSendingCoinType(key)
        break
      }
    }
  }

  let currentStepContent
  if (step === STEPS.ASSET_SELECTION) {
    currentStepContent = (
      <>
        <WithdrawAssetSection
          onSelectCoin={onSelectPrimaryCoin}
          targetCoin={primaryAsset}
          coins={primaryAssets}
          destinationAsset={bscAsset}
          destinationNetwork={destinationNetwork}
        />
        <BaseButton
          fancy={true}
          className="rounded-full px-4 py-3 w-full text-dark-blue"
          onClick={onClickNextStep}
        >
          View {primaryAsset.symbol} bridge info
        </BaseButton>
      </>
    )
  } else if (step === STEPS.FEES_AND_CONFIRM) {
    currentStepContent = (
      <FeeAndConfirm
        assetFromBridge={primaryAsset}
        assetToBridge={bscAsset}
        onClickBack={() => setStep(STEPS.ASSET_SELECTION)}
        destinationNetwork={destinationNetwork}
      />
    )
  }

  return (
    <Grid
      className="justify-center place-items-center justify-items-center"
      gap={4}
      cols={{ xs: 1 }}
    >
      {currentStepContent}
    </Grid>
  )
}
