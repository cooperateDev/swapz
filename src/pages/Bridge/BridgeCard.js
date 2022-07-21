import { useState } from "react"

import Card from "../../components/tailwind/Card"
import Tabs from "../../components/tailwind/Tabs"
import TabItem from "../../components/tailwind/TabItem"

import PlusIcon from "../../components/icons/PlusIcon"
import MinusIcon from "../../components/icons/MinusIcon"

import DepositContent from "./DepositContent"
import WithdrawContent from "./WithdrawContent"

export default function BridgeCard() {
  const [cardNav, setCardNav] = useState("deposit")

  let cardContent
  if (cardNav === "deposit") {
    cardContent = <DepositContent />
  } else if (cardNav === "withdraw") {
    cardContent = <WithdrawContent />
  }

  return (
    <Card
      className="py-2 max-w-lg rounded-xl bg-dark-blue box-shadow text-white"
      title={""}
    >
      <TabSelectorBar cardNav={cardNav} setCardNav={setCardNav} />
      {cardContent}
    </Card>
  )
}

function TabSelectorBar({ cardNav, setCardNav }) {
  return (
    <Tabs className="pt-2">
      <TabItem
        isActive={cardNav === "deposit"}
        onClick={() => {
          setCardNav("deposit")
        }}
      >
        <PlusIcon className="inline-block" />
        Deposit
      </TabItem>
      <TabItem
        isActive={cardNav === "withdraw"}
        onClick={() => {
          setCardNav("withdraw")
        }}
      >
        <MinusIcon className="inline-block" />
        Redeem
      </TabItem>
    </Tabs>
  )
}
