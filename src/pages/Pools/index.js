import {
  STABLECOIN_POOL_NAME,
  NRVBTC_POOL_NAME,
  NRVETH_POOL_NAME,
  RUSD_POOL_NAME,
  FUSDT_POOL_NAME,
  UST_POOL_NAME,
} from "../../constants"

import PageWrapper from "../../components/layouts/PageWrapper"
import StandardPageContainer from "../../components/layouts/StandardPageContainer"

import PoolsListCard from "./PoolsListCard"

export default function PoolsPage() {
  return (
    <PageWrapper>
      <StandardPageContainer title="Pools">
        <PoolsListCard poolName={STABLECOIN_POOL_NAME} />
        {/* <PoolsListCard poolName={NRVBTC_POOL_NAME} />
        <PoolsListCard poolName={NRVETH_POOL_NAME} />
        <PoolsListCard poolName={FUSDT_POOL_NAME} />
        <PoolsListCard poolName={UST_POOL_NAME} />
        <PoolsListCard poolName={RUSD_POOL_NAME} /> */}
      </StandardPageContainer>
    </PageWrapper>
  )
}
