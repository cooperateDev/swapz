import { ChainId } from "../../constants/networks"
import METAMASK_ICON from "../../assets/icons/metamask.svg"

import ExternalLinkButton from "../../components/ExternalLinkButton"
import CopyableAddress from "../../components/CopyableAddress"

export default function ContractListItem({ token, description, docUrl }) {
  const symbol = token.symbol
  const address = token.addresses[ChainId.BSC]
  const icon = token.icon
  const decimals = token.decimals

  const addMetamask = async () => {
    // console.log(address, symbol, decimals, icon, token)
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
          address: address, // The address that the token is at.
          symbol: symbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals: decimals, // The number of decimals in the token
          image: icon, // A string url of the token logo
        },
      },
    });
  }

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
              <img src={METAMASK_ICON} className="h-6 w-6 inline" onClick={addMetamask} />
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
