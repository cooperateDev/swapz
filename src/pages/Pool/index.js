import { Link, useParams } from "react-router-dom"

import { ChevronLeftIcon } from "@heroicons/react/outline"

import {
  ROUTER_INDEX,
  RUSD_POOL_NAME,
  METAPOOL_NAMES,
  POOLS_MAP,
} from "../../constants"

import { RAMP_DEFI_URL, STAKE_PATH, POOLS_PATH } from "../../utils/urls"

import { getCardStyleByRouterIndex } from "../../utils/coinStyles"

import Card from "../../components/tailwind/Card"
import Grid from "../../components/tailwind/Grid"

import LoadingSpinner from "../../components/LoadingSpinner"
import ExternalLinkButton from "../../components/ExternalLinkButton"

import PageWrapper from "../../components/layouts/PageWrapper"
import StandardPageContainer from "../../components/layouts/StandardPageContainer"

import PoolInfoSection from "./PoolInfoSection"
import PoolManagement from "./PoolManagement"

export default function Pool() {
  const { id } = useParams()
  const poolName = ROUTER_INDEX[id]

  const isMeta = METAPOOL_NAMES.includes(poolName)

  let infoTitle
  let rightContent
  let poolStakingLink
  let poolStakingLinkText

  if (poolName === RUSD_POOL_NAME) {
    infoTitle = "Visit Ramp to stake nrvRUSD "
    poolStakingLink = RAMP_DEFI_URL
    poolStakingLinkText = infoTitle
  } else if (isMeta) {
    infoTitle = poolName
    rightContent = `APY: 0%`
    poolStakingLink = STAKE_PATH
  } else {
    infoTitle = poolName
    rightContent = `APY: 0%`
    poolStakingLink = STAKE_PATH
  }

  return (
    <PageWrapper>
      <StandardPageContainer
        title={
          <>
            <div>
              <Link
                to={POOLS_PATH}
                className="text-sm font-medium text-gray-500 hover:text-indigo-600"
              >
                <div className="text-lg inline-block ">Pools</div>
                <ChevronLeftIcon className="w-4 inline-block -mt-1 ml-2 transform-gpu rotate-180" />
              </Link>
            </div>
            <PoolTitle poolName={poolName} />
          </>
        }
      >
        <Grid cols={{ xs: 1 }} gap={2}>
          <Card
            className={
              " my-8 rounded-2xl place-self-center  min-w-4/5 sm:min-w-3/4 md:min-w-3/5 lg:min-w-1/2 " +
              getCardStyleByRouterIndex(id)
            }
            divider={false}
            title={
              <div className=" items-center">
                <h2 className="text-lg text-default font-medium w-full">
                  {infoTitle}
                  {rightContent && (
                    <span className="float-right">{rightContent}</span>
                  )}
                  {poolName === RUSD_POOL_NAME && (
                    <ExternalLinkButton href={RAMP_DEFI_URL} />
                  )}
                </h2>
              </div>
            }
          >
            <PoolManagement
              isMeta={isMeta}
              poolName={poolName}
              poolStakingLink={poolStakingLink}
              poolStakingLinkText={poolStakingLinkText}
            />
          </Card>
          <div>
            <PoolInfoSection poolName={poolName} />
          </div>
        </Grid>
      </StandardPageContainer>
    </PageWrapper>
  )
}

function PoolTitle({ poolName }) {
  const coins = POOLS_MAP[poolName]

  return (
    <div className="inline-flex items-center">
      <h3 className="text-2xl text-default mr-2">{poolName}</h3>
      {coins.map((coin, key) => (
        <img
          className="relative -mr-4 inline-block text-white shadow-solid w-8"
          src={coin.icon}
          key={key}
        />
      ))}
    </div>
  )
}
