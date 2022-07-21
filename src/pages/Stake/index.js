import {
  STABLECOIN_POOL_NAME,
  NRVBTC_POOL_NAME,
  NRVETH_POOL_NAME,
  CAKE_LP_POOL_NAME,
  FUSDT_POOL_NAME,
  RUSD_POOL_NAME,
  UST_POOL_NAME,
} from "../../constants";

import Grid from "../../components/tailwind/Grid";

import PageWrapper from "../../components/layouts/PageWrapper";
import StandardPageContainer from "../../components/layouts/StandardPageContainer";

import PoolStakeCard from "./PoolStakeCard";
import ExternalStakeCard from "./ExternalStakeCard";

export default function Stake() {
  return (
    <PageWrapper>
      <StandardPageContainer title="Stake">
        <Grid cols={{ xs: 1, sm: 1, md: 2 }} gap={6} className="mt-4">
          <PoolStakeCard poolName={STABLECOIN_POOL_NAME} />
          <PoolStakeCard poolName={CAKE_LP_POOL_NAME} />
          {/* <PoolStakeCard poolName={UST_POOL_NAME} />
          <PoolStakeCard poolName={FUSDT_POOL_NAME} />
          <PoolStakeCard poolName={NRVBTC_POOL_NAME} />
          <PoolStakeCard poolName={NRVETH_POOL_NAME} />
          <ExternalStakeCard poolName={RUSD_POOL_NAME} /> */}
        </Grid>
      </StandardPageContainer>
    </PageWrapper>
  );
}
