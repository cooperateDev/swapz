import { RAMP_DEFI_URL, XNRV_STAKING_PATH } from "../../utils/urls";
import { RUSD_POOL_NAME, XNERVE_POOL_NAME } from "../../constants";

import Card from "../../components/tailwind/Card";
import PoolStakingButton from "../../components/PoolStakingButton";

export default function ExternalStakeCard() {
  // "External / Third-party Staking"
  return (
    <Card title="Other Staking">
      <PoolStakingButton
        poolName={RUSD_POOL_NAME}
        poolStakingLink={RAMP_DEFI_URL}
        poolStakingLinkText="Visit Ramp to stake nrvRUSD"
      />
      <PoolStakingButton
        poolName={XNERVE_POOL_NAME}
        poolStakingLink={XNRV_STAKING_PATH}
        poolStakingLinkText="Stake NRV/xNRV"
      />
    </Card>
  );
}
