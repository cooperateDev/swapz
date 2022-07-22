import { STABLECOIN_POOL_NAME, CAKE_LP_POOL_NAME } from "../../constants";

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
          <PoolStakeCard pid={0} />
          <PoolStakeCard pid={2} />
        </Grid>
      </StandardPageContainer>{" "}
    </PageWrapper>
  );
}
