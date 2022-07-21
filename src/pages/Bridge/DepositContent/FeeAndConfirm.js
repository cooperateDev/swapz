import BackButton from "../../../components/BackButton"

export default function FeeAndConfirm({ onClickBack }) {
  // const coinAnyswapInfo = anyswapData?.[assetToBridge.symbol]

  let sectionContent = <div>Please connect wallet</div>

  return (
    <div className="w-full">
      <div className="text-center  py-2 place-items-center prose">
        <BackButton onClick={onClickBack} />
        <div className="px-3">Confirm Deposit</div>
      </div>
      {sectionContent}
    </div>
  )
}
