import { useState, useEffect } from "react"
import classNames from "classnames"

import { SwitchVerticalIcon, ChevronDownIcon } from "@heroicons/react/outline" //SwitchVerticalIcon

import {
  getSwapBorderStyleForCoin,
  getInputBorderFocusStyleForCoin,
  getMenuItemBgForCoin,
  getSwapBorderHoverStyleForCoin,
} from "../../utils/coinStyles"

import {
  getWeb3,
  getCoinBalance
} from "../../components/contracts/swapContract"

export default function CoreSwapContainer({
  selected,
  inputValue,
  isSwapFrom,
  onChangeAmount,
  swapFromToCoins,
  setDisplayType,
  inputRef,
}) {

  const readProvider = getWeb3()

  const [coinBalance, setCoinBalance] = useState()

  useEffect(() => {
    getCoinBalance(readProvider, selected.symbol).then((res) => {
      setCoinBalance(res.toFixed(2))
    })
  })

  function onChange(e) {
    let val = e.target.value

    if (val === "") {
      onChangeAmount("")
    }
    if (
      val.match(/[0-9.]+/) &&
      !val.match(/[a-zA-Z-\$\/]/) &&
      !val.includes("\\")
    ) {
      onChangeAmount(val.replace(/[$,]/g, ""))
    }
  }

  return (
    <div
      className={classNames("text-left pt-2 pb-4 rounded-xl", {
        // [getMenuItemBgForCoin(selected)]: !isSwapFrom,
        ["mt-12"]: !isSwapFrom,
        // ["bg-black"]: isSwapFrom,
      })}
    >
      <div className="flex align-center justify-between">
        <div className={"chain-select rounded-lg hover:bg-purple mb-2"}>
          <div
            className="flex self-center"
            onClick={() => setDisplayType(isSwapFrom ? "from" : "to")}
          >
            <div className="mr-4 flex-shrink-0 self-center hidden sm:block">
              <img className="w-8 h-8 " src={selected.icon} />
              {console.log(selected)}
            </div>
            <div className="text-left cursor-pointer">
              <h4 className="text-lg font-medium ">
                {selected.symbol}
                <ChevronDownIcon className="w-4 inline -mt-1 ml-2 text-coolGray-600 transform transition-all" />
              </h4>
            </div>
          </div>
        </div>
        {isSwapFrom &&
          <p className="group">
            <small className="inline-block float-right mt-1 text-coolGray-500">
              Balance: <span className="text-coolGray-800 font-medium ">{coinBalance}</span>{" "}
              {selected.symbol}
            </small>
          </p>
        }
      </div>
      <div
        className={
          "flex space-x-2 input-container-style xs:input-container-style xs:text-button"
        }
      >
        <div
          className={classNames(
            "input-style xs:input-style xs:text-button rounded-xl ",
            {
              "bg-coolGray-50 border-coolGray-100 focus-within:border-coolGray-300":
                isSwapFrom,
              ["border-coolGray-100 " +
                getInputBorderFocusStyleForCoin(selected)]: !isSwapFrom,
            }
          )}
        >
          <input
            ref={inputRef}
            pattern="[0-9.]+"
            className={`
              ml-auto mr-2
              focus:outline-none
              bg-transparent
              h-full font-mono
              text-right
              w-full
              `}
            placeholder="0.0"
            onChange={onChange}
            value={inputValue}
            disabled={!isSwapFrom ? true : false}

          />
          {!isSwapFrom && (
            <div className="flex justify-center -mt-155">
              <SwitchButton selected={selected} onClick={swapFromToCoins} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SwitchButton({ selected, onClick }) {
  return (
    <div className={"rounded-full " + getSwapBorderStyleForCoin(selected)}>
      <div
        onClick={onClick}
        className={classNames(
          "rounded-full border-3 inline-block p-2 switch-btn",
          "transform transition-all duration-100",
          "active:rotate-180 cursor-pointer",
          getSwapBorderStyleForCoin(selected),
          getSwapBorderHoverStyleForCoin(selected)
        )}
      >
        <SwitchVerticalIcon className="w-5 h-5 text-coolGray-600 hover:text-coolGray-900" />
      </div>
    </div>
  )
}
