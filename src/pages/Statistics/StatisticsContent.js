import {
  STABLECOIN_SWAP_ADDRESSES,
  NRVBTC_SWAP_ADDRESSES,
  NRVETH_SWAP_ADDRESSES,
  STABLECOIN_POOL_NAME,
  NRVBTC_POOL_NAME,
  NRVETH_POOL_NAME,
} from "../../constants";

import Grid from "../../components/tailwind/Grid";

import SmartContractEventTableCard from "./SmartContractEventTableCard";

export default function StatisticsContent() {
  return (
    <Grid gap={4} cols={{ xs: 1 }}>
      <SmartContractEventTableCard
        poolName={STABLECOIN_POOL_NAME}
        swapAddresses={STABLECOIN_SWAP_ADDRESSES}
        valueLabel="($)"
      />
      <SmartContractEventTableCard
        poolName={NRVBTC_POOL_NAME}
        swapAddresses={NRVBTC_SWAP_ADDRESSES}
      />
      <SmartContractEventTableCard
        poolName={NRVETH_POOL_NAME}
        swapAddresses={NRVETH_SWAP_ADDRESSES}
        valueLabel
      />
    </Grid>
  );
}
