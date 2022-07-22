import { useState, useContext } from "react"
import Slider from "react-input-slider"

import { getCoinTextColor } from "../utils/coinStyles"

import Grid from "../components/tailwind/Grid"

import TokenInput from "../components/TokenInput"
import RadioButton from "../components/RadioButton"
import BaseButton from "./BaseButton"

import { PercentContext } from "../components/layouts/PercentContext"

import {
  getWeb3,
  removeLiquidity,
} from "../components/contracts/liquidityContract"
import { WalletContext } from "../components/layouts/walletContext"

export default function PoolManagementWithdraw({ tokens }) {

  const { percentValue, setPercentValue } =
    useContext(PercentContext)
  const { provider, setProvider, walletAddress, setWalletAddress } =
    useContext(WalletContext)

  const getWithdrawInput = () => {
    tokens.map((tk, index) => {
      console.log(formStateData.percentage, formStateData.withdrawType, tk.tokenRef.current.value)
    })
    removeLiquidity(provider, formStateData.withdrawType, formStateData.percentage, tokens)
  }
  const [formStateData, setFormStateData] = useState({
    withdrawType: "ALL",
    percentage: "",
    tokenInputs: "",
  })

  function onFormChange(data, isRadio = false) {
    if (isRadio) {
      tokens.map((tk) => {
        tk.tokenRef.current.value = ""
      })
    }
    let isMultiInput = 0
    let selectedSymbol = ""
    tokens.map((tk) => {
      if (tk.tokenRef.current.value !== "") {
        isMultiInput++
        selectedSymbol = tk.symbol
      }
    })
    if (isMultiInput > 1) {
      data = { ...data, withdrawType: "" }
    } else if (isMultiInput == 1) {
      data = { ...data, withdrawType: selectedSymbol }
    }
    setFormStateData({ ...formStateData, ...data })
    setPercentValue(data.percentage)
  }
  return (
    <div>
      <div className="percentage">
        <span>Withdraw Percentage(%) </span>
        <input
          className="px-2 py-1 w-1/5 border bg-transparent border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="100"
          onChange={(e) =>
            onFormChange({
              percentage: e.currentTarget.value,
            })
          }
          onFocus={(e) => e.target.select()}
          value={formStateData.percentage ? formStateData.percentage : ""}
        />
        <div className="my-2">
          <Slider
            axis="x"
            xstep={1}
            xmin={0}
            xmax={100}
            x={formStateData.percentage ? formStateData.percentage : "100"}
            onChange={({ x }) => {
              onFormChange({
                percentage: String(x),
                withdrawType: 'ALL'
              })
            }}
            styles={{
              track: {
                backgroundColor: "#E0E7FF",
                width: "95%",
              },
              active: {
                backgroundColor: "#6366F1",
              },
              thumb: {
                backgroundColor: "#312E81",
              },
            }}
          />
        </div>
        {formStateData.error && (
          <div className="error">{formStateData.error.message}</div>
        )}
      </div>
      <Grid gap={0} cols={{ xs: 2 }} className=" mt-2">
        <RadioButton
          checked={formStateData.withdrawType === "ALL"}
          onChange={() =>
            onFormChange({
              withdrawType: "ALL",
            },
              true)
          }
          label="Combo"
        />
        {tokens.map((t) => {
          return (
            <RadioButton
              radioClassName={getCoinTextColor(t)}
              key={t.symbol}
              checked={formStateData.withdrawType === t.symbol}
              onChange={() =>
                onFormChange({
                  withdrawType: t.symbol,
                },
                  true)
              }
              label={t.name}
            />
          )
        })}
      </Grid>

      {tokens.map((token, index) => {
        return (
          <div className="mt-4" key={index}>
            <TokenInput
              {...token}
              // inputValue={parseFloat(token.inputValue).toFixed(5)}
              onChange={(value) =>
                onFormChange({
                  percentage: 100,
                  tokenInputs: value,
                  withdrawType: token.symbol,
                })
              }
              tap="remove"
            />
          </div>
        )
      })}
      <BaseButton
        className="w-full mt-4 text-md items-center px-6 py-3 border border-transparent rounded-full text-dark-blue bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={getWithdrawInput}
        fancy={true}
      >
        Withdraw
      </BaseButton>
    </div>
  )
}
