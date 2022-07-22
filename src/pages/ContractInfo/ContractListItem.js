import { ChainId } from "../../constants/networks"
import METAMASK_ICON from "../../assets/icons/metamask.svg"

import ExternalLinkButton from "../../components/ExternalLinkButton"
import CopyableAddress from "../../components/CopyableAddress"

export default function ContractListItem({ token, description, docUrl }) {
  const symbol = token.symbol
  const address = token.addresses[ChainId.BSC]
  const icon = token.icon

  return (
    <li className="ml-auto py-2">
      <div className="w-full">
        <div className="inline-block">
          <p className="text-md font-medium text-purple-700 mr-2">
            {symbol}
            <img src={icon} className="w-4 h-4 inline -mt-1 ml-1" />
          </p>
          <CopyableAddress address={address} />
        </div>
        <div className="inline-block float-right h-full self-center ml-auto">
          <div>
            <button
              className={`px-2 float-right`}
            >
              <img src={METAMASK_ICON} className="h-6 w-6 inline" />
            </button>
          </div>
          <div>
            {docUrl && (
              <ExternalLinkButton
                href={docUrl}
                text={`Open ${symbol} Docs`}
                className="float-right"
              />
            )}
          </div>
        </div>
      </div>
      <div className="w-full">
        <p className="text-xs prose text-gray-600 mb-1.5 mr-2">{description}</p>
      </div>
    </li>
  )
}
