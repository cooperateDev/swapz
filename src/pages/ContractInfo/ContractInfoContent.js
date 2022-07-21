import Card from "../../components/tailwind/Card";

import {
  NRV,
  STABLE_SWAP_TOKEN,
  NRVBTC_SWAP_TOKEN,
  NRVETH_SWAP_TOKEN,
  XNERVE_TOKEN,
  NRV_BUSD_CAKE_TOKEN,
  ANYBTC,
  ANYETH,
  ETHB,
  BTCB,
  BUSD,
  USDT,
  USDC,
  RUSD,
  FUSDT,
} from "../../constants";

import Grid from "../../components/tailwind/Grid";

import ContractListItem from "./ContractListItem";

const CONTRACT_INFO = {
  NRV: {
    token: NRV,
    description: "NRV is the base token behind nerve.fi",
    docUrl: "https://docs.nerve.fi/tokeneconomics",
  },
  XNERVE_TOKEN: {
    token: XNERVE_TOKEN,
    description: "xNRV is the token that is used to stake NRV ",
    docUrl: "https://docs.nerve.fi/xnrv-staking",
  },
  NRV_BUSD_CAKE_TOKEN: {
    token: NRV_BUSD_CAKE_TOKEN,
    description: "The V2 Upgraded Cake NRV/BUSD Liquidity pool token",
    docUrl: "https://docs.nerve.fi/nrv-busd-cake-lp",
  },
  STABLE_SWAP_TOKEN: {
    token: STABLE_SWAP_TOKEN,
    description: "Nerve's 3Pool stableswap LP token",
    docUrl: "https://docs.nerve.fi/stable-swap-3pool",
  },
  NRVBTC_SWAP_TOKEN: {
    token: NRVBTC_SWAP_TOKEN,
    description: "Nerve's BTCB/anyBTC LP token",
    docUrl: undefined,
  },
  NRVETH_SWAP_TOKEN: {
    token: NRVETH_SWAP_TOKEN,
    description: "Nerve's ETH/anyETH LP token",
    docUrl: undefined,
  },
  ANYBTC: {
    token: ANYBTC,
    description: "Anyswap's anyBTC token",
    docUrl: undefined,
  },
  ANYETH: {
    token: ANYETH,
    description: "Anyswap's anyETH token",
    docUrl: undefined,
  },
  BTCB: {
    token: BTCB,
    description:
      "Binance's BTCB is a BEP-20 token that is fully backed by Bitcoin (BTC)",
    docUrl: undefined,
  },
  ETHB: {
    token: ETHB,
    description:
      "Binance's ETH is a BEP-20 token that is fully backed by Ethereum (ETH)",
    docUrl: undefined,
  },
  BUSD: {
    token: BUSD,
    description:
      "BUSD is a stablecoin that is pegged to the US dollar and backed/issued by Binance",
    docUrl: undefined,
  },
  USDC: {
    token: USDC,
    description: `USD Coin (known by its ticker USDC) is a stablecoin that is pegged to the
      U.S. dollar on a 1:1 basis. Every unit of this cryptocurrency in circulation
      is backed up by $1 that is held in reserve`,
    docUrl: undefined,
  },
  USDT: {
    token: USDT,
    description: `USDT mirrors the price of the U.S. dollar, issued by a Hong Kong-based company Tether.
      The token’s peg to the USD is achieved via maintaining a sum of dollars in reserves equal
      to the number of USDT in circulation.`,
    docUrl: undefined,
  },
  RUSD: {
    token: RUSD,
    description: "Ramps's rUSD is a BEP-20 stablecoin that can be borrowed",
    docUrl: undefined,
  },
  FUSDT: {
    token: USDT,
    description: `USDT mirrors the price of the U.S. dollar, issued by a Hong Kong-based company Tether.
      The token’s peg to the USD is achieved via maintaining a sum of dollars in reserves equal
      to the number of USDT in circulation.`,
    docUrl: undefined,
  },
  FUSDT: {
    token: FUSDT,
    description: `Frapped USDT an wrapper for USDT tokens aiding in multichain compatability`,
    docUrl: undefined,
  },
};

export default function ContractInfoContent() {
  return (
    <Grid cols={{ xs: 1 }} gap={6}>
      <ContractGroupCard title="Tokens">
        <ContractListItem {...CONTRACT_INFO.NRV} />
        <ContractListItem {...CONTRACT_INFO.XNERVE_TOKEN} />
        <ContractListItem {...CONTRACT_INFO.NRV_BUSD_CAKE_TOKEN} />
        <ContractListItem {...CONTRACT_INFO.STABLE_SWAP_TOKEN} />
        <ContractListItem {...CONTRACT_INFO.NRVBTC_SWAP_TOKEN} />
        <ContractListItem {...CONTRACT_INFO.NRVETH_SWAP_TOKEN} />
      </ContractGroupCard>
      <ContractGroupCard title="BTC Tokens">
        <ContractListItem {...CONTRACT_INFO.ANYBTC} />
        <ContractListItem {...CONTRACT_INFO.BTCB} />
      </ContractGroupCard>
      <ContractGroupCard title="ETH Tokens">
        <ContractListItem {...CONTRACT_INFO.ANYETH} />
        <ContractListItem {...CONTRACT_INFO.ETHB} />
      </ContractGroupCard>
      <ContractGroupCard title="USD Stablecoins">
        <ContractListItem {...CONTRACT_INFO.BUSD} />
        <ContractListItem {...CONTRACT_INFO.USDC} />
        <ContractListItem {...CONTRACT_INFO.USDT} />
        <ContractListItem {...CONTRACT_INFO.RUSD} />
        <ContractListItem {...CONTRACT_INFO.FUSDT} />
      </ContractGroupCard>
    </Grid>
  );
}

function ContractGroupCard({ title, children }) {
  return (
    <Card title={title} className="!pb-2">
      <ul className="divide-y divide-gray-200">{children}</ul>
    </Card>
  );
}
