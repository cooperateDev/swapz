import classNames from "classnames"
import { Menu, Transition } from "@headlessui/react"

import { ChevronDownIcon } from "@heroicons/react/outline"

import {
  getMenuItemStyleForCoin,
  getMenuItemBgForCoin,
} from "../utils/coinStyles"

export default function AssetDropdown({ coins, onSelectCoin, targetCoin }) {
  return (
    <Menu>
      {({ open }) => (
        <div
          className={`
            absolute rounded-lg
            text-base focus:outline-none overflow-hidden z-10
            transform transition-0
            `}
        >
          <Menu.Button className="relative focus:outline-none text-left">
            <CoinItemContent
              coin={targetCoin}
              open={open}
              expanderIcon={true}
            />
          </Menu.Button>
          {open && <hr />}
          <Transition
            appear={true}
            unmount={false}
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform-gpu scale-y-0 "
            enterTo="transform-gpu scale-y-100"
            leave="transition duration-75 ease-out "
            leaveFrom="transform-gpu scale-y-100"
            leaveTo="transform-gpu scale-y-0 "
            className="origin-top "
          >
            <Menu.Items
              static
              as="ul"
              className="w-full mx-auto transform transition focus:outline-none "
            >
              {coins
                .filter((coin) => coin.symbol !== targetCoin.symbol)
                .map((coin, key) => (
                  <CoinItem coin={coin} onSelectCoin={onSelectCoin} key={key} />
                ))}
            </Menu.Items>
          </Transition>
        </div>
      )}
    </Menu>
  )
}

function CoinItem({ coin, onSelectCoin }) {
  return (
    <Menu.Item
      as="li"
      onClick={() => {
        onSelectCoin(coin)
      }}
    >
      {({ active }) => <CoinItemContent coin={coin} active={active} />}
    </Menu.Item>
  )
}

function CoinItemContent({
  coin,
  expanderIcon = false,
  open = false,
  active = false,
}) {
  return (
    <div
      className={classNames(
        "transition cursor-pointer px-4 py-4 w-48 sm:w-80 bg-dark-blue",
        getMenuItemStyleForCoin(coin),
        { [getMenuItemBgForCoin(coin)]: active }
      )}
    >
      <img className="w-6 mr-2 inline" src={coin.icon} alt="coin-icon" />
      <span>{coin.symbol}</span>
      {expanderIcon && (
        <ChevronDownIcon
          className={classNames(
            "ml-1 w-4 inline float-right mt-1.5 transform transition",
            { "rotate-180": open }
          )}
        />
      )}
    </div>
  )
}
