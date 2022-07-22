import { useRef, useState, useContext, useEffect } from "react"

import { Link } from "react-router-dom"

import { SWAPABLE_TOKENS, STABLE_SWAP_TOKEN } from "../../constants"

import Grid from "../../components/tailwind/Grid"

import BaseButton from "../../components/BaseButton"

import PageWrapper from "../../components/layouts/PageWrapper"

import SwapCard from "./SwapCard"

import { getInfoMultiCoin } from "./getInfoMultiCoin"

import { WalletContext } from "../../components/layouts/walletContext"
import {
  getWeb3,
  swap,
  getCalaulateSwap
} from "../../components/contracts/swapContract"

export default function SwapPage() {
  // build a representation of pool tokens for the UI
  const index = SWAPABLE_TOKENS.indexOf(STABLE_SWAP_TOKEN)
  let coins
  if (index > -1) {
    coins = SWAPABLE_TOKENS.splice(index, 1)
  } else {
    coins = SWAPABLE_TOKENS
  }

  const { provider, setProvider, walletAddress, setWalletAddress } =
    useContext(WalletContext)
  const readProvider = getWeb3()

  const [calculateValue, setCalculateValue] = useState()

  const [fromCoin, setFromCoin] = useState(SWAPABLE_TOKENS[0])
  const [toCoin, setToCoin] = useState(SWAPABLE_TOKENS[1])

  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")

  const fromRef = useRef(null)
  const toRef = useRef(null)

  const [exchangeRate, setExchangeRate] = useState(0)

  const [lastChangeType, setLastChangeType] = useState("from")

  function swapFromToCoins() {
    setFromCoin(toCoin)
    setToCoin(fromCoin)
    // if (lastChangeType === "from") {
    //   onChangeFromAmount(fromRef.current.value)
    // } else {
    //   setFromValue("")
    // }
    setExchangeRate(0)

  }

  function onSelectFromCoin(coin, checkPool = true) {
    if (checkPool !== false) {
      const info = getInfoMultiCoin(coin, toCoin)
      onSelectToCoin(info.otherCoin, false)
      console.log(
        coin.symbol,
        info.otherCoin.symbol,
        fromRef.current.value,
        toRef.current.value
      )
    }

    if (coin.symbol === toCoin.symbol) {
      swapFromToCoins()
    } else {
      setFromCoin(coin)
    }
  }

  function resetRates() {
    setExchangeRate(0)
  }

  function onSelectToCoin(coin, checkPool = true) {
    if (checkPool !== false) {
      const info = getInfoMultiCoin(coin, fromCoin)
      onSelectFromCoin(info.otherCoin, false)
      console.log(
        coin.symbol,
        info.otherCoin.symbol,
        fromRef.current.value,
        toRef.current.value
      )
    }

    if (coin.symbol === fromCoin.symbol) {
      swapFromToCoins()
    } else {
      setToCoin(coin)
      setToValue("")
      if (lastChangeType === "to") {
        setFromValue("")
      }
      resetRates()
    }
  }
  useEffect(() => {
    if (fromRef.current.value != "undefined" && fromRef.current.value != "") {
      getCalaulateSwap(readProvider, fromCoin.symbol, toCoin.symbol, fromRef.current.value ? fromRef.current.value : "0").then((res) => {
        setToValue(res === 0 ? '0.0' : res)
        setCalculateValue(res)
      })
    }

  })

  async function onChangeFromAmount(value) {
    setLastChangeType("from")
    setFromValue(value)
  }

  function onChangeToAmount(value) {
    setLastChangeType("to")
    setToValue(value)
  }

  return (
    <PageWrapper>
      <main className="relative z-0 overflow-y-auto focus:outline-none h-full">
        <div className="py-6">
          <Grid
            cols={{ xs: 1 }}
            gap={6}
            className="py-8 sm:py-12 justify-center px-2 sm:px-6 md:px-8"
          >
            <div className="place-self-center text-white w-full xs:w-500">
              <SwapCard
                {...{
                  fromCoin,
                  fromValue,
                  toCoin,
                  toValue,
                  coins,
                  onSelectFromCoin,
                  onSelectToCoin,
                  swapFromToCoins,
                  onChangeFromAmount,
                  onChangeToAmount,
                  exchangeRate,
                  fromRef,
                  toRef,
                  calculateValue
                }}
              />
            </div>
          </Grid>
          <RemainingHomeContent />
        </div>
      </main>
    </PageWrapper>
  )
}

function RemainingHomeContent() {
  return (
    <Grid
      cols={{ xs: 1 }}
      gap={6}
      className="py-3 justify-center px-2 sm:px-6 md:px-8"
    >
      <div className="px-4 text-white">
        <div className="flex flex-col my-6 text-center">
          <h3 className="text-default font-medium text-2xl">About Swapz</h3>
          <p className="mt-5 max-w-prose mx-auto text-lg  text-coolGray-700">
            Swapz stable is a trustless on-ramp and stableswap on the Velas(fork of Nerve).
          </p>
          {/* <p className="mt-2 max-w-prose mx-auto text-base  text-coolGray-500">
            Bridge assets onto BSC and earn yield on BTC, ETH, and stablecoins
          </p> */}
          <Grid cols={{ xs: 1 }} gap={2}>
            <div className="place-self-center">
              <Link to="/pools">
                <BaseButton
                  fancy={true}
                  swap={true}
                  className={`
                    mt-4 px-4 py-3 text-base font-medium rounded-lg
                    shadow-indigo-lg hover:shadow-indigo-xl
                    text-white focus:outline-none
                    `}
                >
                  Explore Swapz Pools
                </BaseButton>
              </Link>
            </div>
          </Grid>
        </div>
      </div>
    </Grid>
  )
}
