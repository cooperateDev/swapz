import Tabs from "../../components/tailwind/Tabs";
import TabItem from "../../components/tailwind/TabItem";

import PlusIcon from "../../components/icons/PlusIcon";
import MinusIcon from "../../components/icons/MinusIcon";

export default function LiquidityManagementTabs({ cardNav, setCardNav }) {
  return (
    <Tabs>
      <TabItem
        isActive={cardNav === "addLiquidity"}
        onClick={() => {
          setCardNav("addLiquidity");
        }}
      >
        <PlusIcon className="inline-block" />
        Add Liquidity
      </TabItem>
      <TabItem
        isActive={cardNav === "removeLiquidity"}
        onClick={() => {
          setCardNav("removeLiquidity");
        }}
      >
        <MinusIcon className="inline-block" />
        Remove Liquidity
      </TabItem>
    </Tabs>
  );
}
