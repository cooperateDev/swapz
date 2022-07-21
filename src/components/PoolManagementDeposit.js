import { useEffect, useState, useContext, useCallback } from "react"

import TokenInput from "../components/TokenInput"
import BaseButton from "../components/BaseButton"

import { WalletContext } from "../components/layouts/walletContext"
import {
  getWeb3,
  addLiquidity,
} from "../components/contracts/liquidityContract"

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function PoolManagementDeposit({ tokens }) {
  const { provider, setProvider, walletAddress, setWalletAddress } =
    useContext(WalletContext)

  const readProvider = getWeb3()
  let toastFlag = 1

  const myPromise = new Promise(resolve => setTimeout(resolve, 3000));

  const addLiquidityDeposit = () => {
    toastFlag = addLiquidity(provider, tokens)
    // console.log(tokens)
    // console.log(tokens[0].tokenRef.current.value)
    if (toast == 0) {
      toast.promise(myPromise, {
        pending: "Promise is pending",
        success: "The amount you want to add liquidity is greater than the amount you have in your wallet.",
        error: "error"
      });
    }

  }
  return (
    <div className="flex-col">
      {console.log(tokens)}
      {tokens.map((token, key) => (
        <div className="mt-4" key={key}>
          <TokenInput
            symbol={token.symbol}
            icon={token.icon}
            max={token.max}
            tokenRef={tokens[key].tokenRef}
          />
        </div>
      ))}
      <BaseButton
        fancy={true}
        className="w-full mt-4 text-md items-center px-6 py-3 rounded-full text-dark-blue"
        onClick={addLiquidityDeposit}
      >
        Deposit
      </BaseButton>
      <ToastContainer
        autoClose={3000}
        className="toast-container"
        toastClassName="dark-toast"
        toastStyle={{
          top: "5rem",
          right: "2rem"
        }} />
      {/* < priceImpact={priceImpact} /> */}
    </div>
  )
}
