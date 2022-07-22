import { useEffect, useState, useContext, useCallback } from "react"
import classNames from "classnames"

import { Transition } from "@headlessui/react"

import { getSwapCardShadowStyleForCoin } from "../../utils/coinStyles"

import Grid from "../../components/tailwind/Grid"
import Card from "../../components/tailwind/Card"

import BaseButton from "../../components/BaseButton"

import CoreSwapContainer from "./CoreSwapContainer"
import ExchangeRateInfo from "./ExchangeRateInfo"
import CoinSlideOver from "./CoinSlideOver"
import { ToastContainer, toast } from 'react-toastify';
import { WalletContext } from "../../components/layouts/walletContext"
import {
  getWeb3,
  swap,
} from "../../components/contracts/swapContract"

export default function SwapCard({
  coins,
  fromCoin,
  fromValue,
  toCoin,
  toValue,
  swapFromToCoins,
  onSelectFromCoin,
  onSelectToCoin,
  onChangeFromAmount,
  onChangeToAmount,
  exchangeRate,
  fromRef,
  toRef,
  calculateValue
}) {
  const [displayType, setDisplayType] = useState(undefined)

  const { provider, setProvider, walletAddress, setWalletAddress } =
    useContext(WalletContext)

  const myPromise = new Promise(resolve => setTimeout(resolve, 3000));
  const readProvider = getWeb3()
  let toastFlag = 1

  let btnText = "Execute Swap"

  let showExchageRate = fromValue === "" ? false : true
  const fromArgs = {
    isSwapFrom: true,
    tokens: coins, //.filter(i => (i.symbol !== fromCoin.symbol)),
    selected: fromCoin,
    onChangeSelected: onSelectFromCoin,
    onChangeAmount: onChangeFromAmount,
    inputValue: fromValue,
    setDisplayType,
    inputRef: fromRef,
  }

  const toArgs = {
    isSwapFrom: false,
    tokens: coins, //.filter(i => (i.symbol !== toCoin.symbol)),
    selected: toCoin,
    onChangeSelected: onSelectToCoin,
    onChangeAmount: onChangeToAmount,
    inputValue: toValue,
    swapFromToCoins: swapFromToCoins,
    setDisplayType,
    inputRef: toRef,
  }

  const exchangeRateInfoContent = (
    <ExchangeRateInfo
      fromCoin={fromCoin}
      toCoin={toCoin}
      exchangeRate={exchangeRate}
      fromRef={fromRef}
      calculateValue={calculateValue}
    />
  )

  const execuateSwap = () => {
    if (fromRef.current.value == "undefined" || fromRef.current.value == "") {
      toast.promise(myPromise, {
        pending: "Promise is pending",
        success: "Please input the data",
        error: "error"
      });
    } else if (toRef.current.value == "undefined" || toRef.current.value == "") {
      toast.promise(myPromise, {
        pending: "Promise is pending",
        success: "Please input the data",
        error: "error"
      });
    } else {
      // console.log(fromCoin.symbol, fromRef.current.value, toCoin.symbol, toRef.current.value)
      toastFlag = swap(provider, fromCoin.symbol, fromRef.current.value, toCoin.symbol)

      if (toastFlag == 0) {
        toast.promise(myPromise, {
          pending: "Promise is pending",
          success: "The amount you want to add liquidity is greater than the amount you have in your wallet.",
          error: "error"
        });
      }
    }

  }

  const swapCardMainContent = (
    <>
      <Grid cols={{ xs: 1 }} gap={4} className="place-content-center">
        <CoreSwapContainer {...fromArgs} />
        <CoreSwapContainer {...toArgs} />
      </Grid>
      <BaseButton
        fancy={true}
        type="button"
        className="w-full rounded-full mt-4 mb-4 px-4 py-3 tracking-wide bg-dark-magento text-dark-blue disabled:bg-gray-300 cursor-pointer"
        onClick={execuateSwap}
      >
        <span>{btnText}</span>
      </BaseButton>
      <ToastContainer
        autoClose={3000}
        className="toast-container"
        toastClassName="dark-toast"
        toastStyle={{
          top: "0rem",
          right: "5rem"
        }} />
      <Transition
        appear={true}
        unmount={false}
        show={showExchageRate}
        enter="transition duration-100 ease-out"
        enterFrom="transform-gpu scale-y-0 "
        enterTo="transform-gpu scale-y-100 opacity-100"
        leave="transition duration-75 ease-out "
        leaveFrom="transform-gpu scale-y-100 opacity-100"
        leaveTo="transform-gpu scale-y-0 "
        className="origin-top -mx-6 "
      >
        {exchangeRateInfoContent}
      </Transition>
    </>
  )

  const fromCardContent = <CoinSlideOver key="fromBlock" {...fromArgs} />

  const toCardContent = <CoinSlideOver key="toBlock" {...toArgs} />

  const transitionProps = {
    appear: true,
    unmount: true,
    enter: "transition duration-150 ease-out",
    enterFrom: "transform-gpu scale-y-0 ",
    enterTo: "transform-gpu scale-y-100 opacity-100",
    leave: "transition duration-150 ease-out ",
    leaveFrom: "transform-gpu scale-y-100 opacity-100",
    leaveTo: "transform-gpu scale-y-0 opacity-50",
    className:
      "origin-bottom absolute w-full bg-modal modal-style -ml-6 -mt-12 z-20 rounded-2xl",
  }
  return (
    <Card
      title="Swap"
      divider={false}
      className={classNames(
        " transform transition-all duration-100 rounded-2xl",
        {
          [getSwapCardShadowStyleForCoin(fromCoin)]: displayType === "from",
          [getSwapCardShadowStyleForCoin(toCoin)]: displayType === "to",
          "shadow-indigo-xl hover:shadow-purple-2xl": !displayType,
        }
      )}
    >
      <div className="-mb-6">
        <Transition show={displayType === "from"} {...transitionProps}>
          {fromCardContent}
        </Transition>
        <Transition show={displayType === "to"} {...transitionProps}>
          {toCardContent}
        </Transition>

        {swapCardMainContent}
      </div>
    </Card>
  )
}
