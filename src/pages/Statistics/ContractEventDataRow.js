import _ from "lodash"

import { format } from "date-fns"

import { POOLS_MAP } from "../../constants"

import { getExplorerTxUrl } from "../../utils/urls"

import TableCell from "../../components/tailwind/TableCell"

import NarrowArrowIcon from "../../components/icons/NarrowArrowIcon"

function getHashFragment(hash) {
  return `${hash.slice(0, 6)}...${hash.slice(-4, hash.length)}`
}

function buildCompatibleDate(dt) {
  return new Date(dt.split(" ").join("T"))
}

export default function ContractEventDataRow({
  block,
  transaction,
  fuckingArguments,
  poolName,
}) {
  const groupedArguments = groupArguments(fuckingArguments)

  return (
    <tr>
      <TableCell>
        {format(buildCompatibleDate(block.timestamp.time), "PPpp")}
      </TableCell>
      <TableCell>
        <a
          href={getExplorerTxUrl(transaction)}
          className="hover:text-blue-600 active:text-blue-800"
          target="_blank"
        >
          {getHashFragment(transaction.hash)}
        </a>
      </TableCell>
      <TableCell>
        <TokenBlob
          token={POOLS_MAP[poolName][groupedArguments["soldId"][0].value]}
        />
        <NarrowArrowIcon className="inline w-4 h-4 text-gray-400 justify-self-center" />
        <TokenBlob
          token={POOLS_MAP[poolName][groupedArguments["boughtId"][0].value]}
        />
      </TableCell>
    </tr>
  )
}

function TokenBlob({ token }) {
  const formattedValue = 0
  return (
    <div className="inline-block px-2 pb-0.5">
      <div>
        <img src={token?.icon} className="inline w-4 h-4 mr-1" />
        <span className="text-xs font-medium text-gray-500 mt-1">
          {token.symbol}
        </span>
      </div>
      <div>
        <small>{formattedValue}</small>
      </div>
    </div>
  )
}

function groupArguments(fuckingArguments) {
  return _.groupBy(fuckingArguments, "argument")
}
