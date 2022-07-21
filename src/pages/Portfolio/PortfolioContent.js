import {
  NRV,
  XNERVE_TOKEN,
  NRV_IMG,
  STABLE_SWAP_TOKEN,
  NRVBTC_SWAP_TOKEN,
  NRVETH_SWAP_TOKEN,
  NRV_BUSD_CAKE_TOKEN,
  ANYBTC,
  ANYETH,
} from "../../constants";

import Grid from "../../components/tailwind/Grid";
import Card from "../../components/tailwind/Card";

import PortfolioListItem from "./PortfolioListItem";

import {
  XNRV_STAKING_PATH,
  STAKE_PATH,
  BRIDGE_PATH,
  PANCAKE_ADD_LIQUIDITY_NRV_BUSD_URL,
  getPoolUrl,
} from "../../utils/urls";

export default function PortfolioContent() {
  const poolItemProps = {
    stakeLinkTo: STAKE_PATH,
    getBalanceLinkToUrl: getPoolUrl,
    getTitleLinkTo: getPoolUrl,
  };

  const nrvItemProps = {
    getBalanceLinkToUrl: () => XNRV_STAKING_PATH,
    getTitleLinkTo: () => XNRV_STAKING_PATH,
  };

  return (
    <Grid cols={{ xs: 1 }} gap={6}>
      <PortfolioGroupCard title="NRV Balances">
        <PortfolioListItem token={NRV} {...nrvItemProps} />
        <PortfolioListItem
          token={XNERVE_TOKEN}
          stakeLinkTo={XNRV_STAKING_PATH}
          {...nrvItemProps}
        />
        <PortfolioListItem
          token={NRV_BUSD_CAKE_TOKEN}
          stakeLinkTo={STAKE_PATH}
          getTitleLinkTo={() => PANCAKE_ADD_LIQUIDITY_NRV_BUSD_URL}
        />
      </PortfolioGroupCard>
      <PortfolioGroupCard title="Swap Pool Balances">
        <PortfolioListItem token={STABLE_SWAP_TOKEN} {...poolItemProps} />
        <PortfolioListItem token={NRVBTC_SWAP_TOKEN} {...poolItemProps} />
        <PortfolioListItem token={NRVETH_SWAP_TOKEN} {...poolItemProps} />
      </PortfolioGroupCard>
      <PortfolioGroupCard title="anyToken Balances">
        <PortfolioListItem
          token={ANYBTC}
          getBalanceLinkToUrl={() => BRIDGE_PATH}
        />
        <PortfolioListItem
          token={ANYETH}
          getBalanceLinkToUrl={() => BRIDGE_PATH}
        />
      </PortfolioGroupCard>
    </Grid>
  );
}

function PortfolioGroupCard({ title, children }) {
  return (
    <Card title={title} className="!pb-2.5">
      <ul className="divide-y divide-gray-200">{children}</ul>
    </Card>
  );
}
