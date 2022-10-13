import BalanceSection from "./BalanceSection"

export default function StakedBalanceSection({ stakeLinkTo }) {
  return (
    <>
      <BalanceSection label="Staked Balance" linkTo={stakeLinkTo} />
      {/* <BalanceSection label="Unclaimed Rewards" linkTo={stakeLinkTo} /> */}
    </>
  )
}
