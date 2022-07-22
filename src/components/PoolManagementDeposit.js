import { useEffect, useState, useContext, useCallback } from "react"

import TokenInput from "../components/TokenInput"
import BaseButton from "../components/BaseButton"

import { useLocation } from "react-router";

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
  const location = useLocation();

  const myPromise = new Promise(resolve => setTimeout(resolve, 3000));

  const addLiquidityDeposit = () => {
    // toastFlag = addLiquidity(provider, tokens)/
    // console.log(tokens)
    if (tokens[0].tokenRef.current.value == "") {
      toast.promise(myPromise, {
        pending: "Promise is pending",
        success: "P;ease input the data",
        error: "error"
      });
    } else if (tokens[1].tokenRef.current.value == "") {
      toast.promise(myPromise, {
        pending: "Promise is pending",
        success: "P;ease input the data",
        error: "error"
      });
    } else if (tokens[2].tokenRef.current.value == "") {
      toast.promise(myPromise, {
        pending: "Promise is pending",
        success: "P;ease input the data",
        error: "error"
      });
    } else {
      toastFlag = addLiquidity(provider, tokens)
      if (toastFlag == 0) {
        toast.promise(myPromise, {
          pending: "Promise is pending",
          success: "The amount you want to add liquidity is greater than the amount you have in your wallet.",
          error: "error"
        });
      }
    }
    location.reload();

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
    </div>
  )
}
