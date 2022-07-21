import { useState } from "react"
import { useQuery, gql } from "@apollo/client"

import { ChainId } from "../../constants/networks"
import { INVERTED_ROUTER_INDEX, CONTRACT_EVENTS } from "../../constants"

import { getCardStyleByRouterIndex } from "../../utils/coinStyles"
import { getPoolUrl } from "../../utils/urls"

import Card from "../../components/tailwind/Card"
import Table from "../../components/tailwind/Table"
import TableHeader from "../../components/tailwind/TableHeader"
import TableHeaderCell from "../../components/tailwind/TableHeaderCell"
import TableBody from "../../components/tailwind/TableBody"

import LinkButton from "../../components/LinkButton"

import ContractEventDataRow from "./ContractEventDataRow"
import PaginationSection from "./PaginationSection"

//

export default function SmartContractEventTableCard({
  swapAddresses,
  poolName,
  valueLabel,
}) {
  const [pageNum, setPageNum] = useState(1)
  const limit = 10
  const offset = limit * (pageNum - 1)

  const { data } = useQuery(SWAP_STATISTICS_QUERY, {
    variables: {
      limit: limit,
      offset: offset,
      network: "bsc",
      contract: swapAddresses[ChainId.BSC],
      event: CONTRACT_EVENTS.TokenSwap,
      from: null,
      till: null,
      dateFormat: "%Y-%m",
    },
  })
  const { smartContractEvents } = data?.["ethereum"] ?? {}

  return (
    <Card
      title={
        <>
          {`Recent ${poolName} Swaps `}
          <div className="float-right">
            <LinkButton href={getPoolUrl({ poolName })} />
          </div>
        </>
      }
      className={
        "overflow-x-hidden " +
        getCardStyleByRouterIndex(INVERTED_ROUTER_INDEX[poolName])
      }
    >
      <SmartContractEventTable
        smartContractEvents={smartContractEvents}
        valueLabel={valueLabel}
        pageNum={pageNum}
        setPageNum={setPageNum}
        poolName={poolName}
      />
    </Card>
  )
}

function SmartContractEventTable({
  smartContractEvents,
  valueLabel,
  pageNum,
  setPageNum,
  poolName,
}) {
  return (
    <div className={`-mx-6 `}>
      <Table className="">
        <TableHeader className="bg-light-purple">
          <TableHeaderCell>Time</TableHeaderCell>
          {/* <TableHeaderCell>
            Block Height
          </TableHeaderCell> */}
          {/* <TableHeaderCell>
            Event Name
          </TableHeaderCell>
           <TableHeaderCell>
            Smart Contract Address
          </TableHeaderCell>  */}
          <TableHeaderCell>Transaction Hash</TableHeaderCell>
          <TableHeaderCell>{valueLabel} Swap Pair</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {smartContractEvents?.map((eventData, idx) => (
            <ContractEventDataRow
              {...eventData}
              key={idx}
              poolName={poolName}
            />
          ))}
        </TableBody>
      </Table>
      <hr />
      <PaginationSection pageNum={pageNum} setPageNum={setPageNum} />
    </div>
  )
}

const SWAP_STATISTICS_QUERY = gql`
  query SwapStatistics(
    $network: EthereumNetwork!
    $limit: Int!
    $offset: Int!
    $contract: String!
    $event: String!
    $from: ISO8601DateTime
    $till: ISO8601DateTime
  ) {
    ethereum(network: $network) {
      smartContractEvents(
        options: {
          desc: "block.timestamp.time"
          limit: $limit
          offset: $offset
        }
        smartContractAddress: { is: $contract }
        smartContractEvent: { is: $event }
        date: { since: $from, till: $till }
      ) {
        block {
          timestamp {
            time(format: "%Y-%m-%d %H:%M:%S")
          }
          height
        }
        smartContractEvent {
          name
          signatureHash
        }
        smartContract {
          address {
            address
            annotation
          }
        }
        transaction {
          hash
        }
        fuckingArguments: arguments {
          argument
          argumentType
          index
          value
        }
      }
    }
  }
`

/* contract calls in past * timeperiod
count(
uniq: SmartContractCallsUniq
date: DateSelector
time: DateTimeSelector
height: BlockSelector
txHash: HashSelector
txFrom: [EthereumAddressSelector!]
smartContractType: SmartContractTypeSelector
smartContractAddress: [EthereumAddressSelector!]
smartContractEvent: EventSelector
): Int
*/
