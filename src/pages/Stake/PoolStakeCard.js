import { Link } from "react-router-dom"

import { getPoolUrl } from "../../utils/urls"

import StakeCard from "../../components/StakeCard"
import LinkButton from "../../components/LinkButton"

import { STAKING_POOLS } from "../../constants/constant"

export default function PoolStakeCard({ pid }) {
  const pool = STAKING_POOLS[pid];
  const poolName = pool.name;
  const href = getPoolUrl({ poolName })
  return (
    <StakeCard
      pid={pid}
      poolName={poolName}
      poolLabel={<JumpToPoolButton poolName={poolName} href={href} />}
      rightContent={<LinkButton href={href} />}
    />
  )
}

function JumpToPoolButton({ poolName, href }) {
  const linkClassName = "text-blue-600 hover:text-blue-500"

  if (href[0] === "/") {
    return (
      <Link to={href} className={linkClassName}>
        {poolName}
      </Link>
    )
  } else {
    return (
      <a href={href} className={linkClassName} target="_blank">
        {poolName}
      </a>
    )
  }
}
