import _ from "lodash"

import { useState } from "react"

import { BRIDGE_GOD } from "../../../constants"

import Grid from "../../../components/tailwind/Grid"

import BaseButton from "../../../components/BaseButton"

import FeeAndConfirm from "./FeeAndConfirm"
import DepositAssetSection from "./DepositAssetSection"

import { STEPS } from "../globals"

export default function DepositContent() {
  const [sendingCoinType, setSendingCoinType] = useState("ETH")
  const [destinationNetwork, setDestinationNetwork] = useState("BSC")

  const [step, setStep] = useState(STEPS.ASSET_SELECTION)
  const { primaryAsset, bscAsset } = BRIDGE_GOD[sendingCoinType]

  const bscAssets = _.entries(BRIDGE_GOD).map(([key, value]) => value.bscAsset)

  function onClickNextStep() {
    if (step === STEPS.ASSET_SELECTION) {
      setStep(STEPS.FEES_AND_CONFIRM)
    }
  }

  function onSelectPrimaryCoin(coin) {
    for (const [key, targetedPair] of _.entries(BRIDGE_GOD)) {
      if (targetedPair.bscAsset.symbol === coin.symbol) {
        setSendingCoinType(key)
        break
      }
    }
  }

  let currentStepContent
  if (step === STEPS.ASSET_SELECTION) {
    currentStepContent = (
      <>
        <DepositAssetSection
          onSelectCoin={onSelectPrimaryCoin}
          targetCoin={bscAsset}
          coins={bscAssets}
          destinationAsset={primaryAsset}
          destinationNetwork={destinationNetwork}
        />
        <BaseButton
          fancy={true}
          className="rounded-full px-4 py-3 w-full text-dark-blue"
          onClick={onClickNextStep}
        >
          View {bscAsset.symbol} bridge info
        </BaseButton>
      </>
    )
  } else if (step === STEPS.FEES_AND_CONFIRM) {
    currentStepContent = (
      <FeeAndConfirm
        assetToBridge={bscAsset}
        onClickBack={() => setStep(STEPS.ASSET_SELECTION)}
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
