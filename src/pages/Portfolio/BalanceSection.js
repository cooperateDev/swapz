import { useEffect, useState, useContext, useCallback } from "react"

import { Link } from "react-router-dom"

import Grid from "../../components/tailwind/Grid"

import { WalletContext } from "../../components/layouts/walletContext"

import {
  getTokenBalance,
  getStakedTokenBalance,
  getPendingReward
} from "../../components/contracts/masterMind"

export default function BalanceSection({ label, address, linkTo }) {

  const { provider, setProvider, walletAddress, setWalletAddress } =
    useContext(WalletContext)

  const [balance, setBalance] = useState()

  useEffect(() => {
    (async () => {
      if (label == "Total Balance") {
        const balance = await getTokenBalance(provider, address)
        setBalance(balance)
      }
      if (label == "Staked Balance") {
        const balance = await getStakedTokenBalance(provider, 1)
        setBalance(balance)
      }
      if (label == "Unclaimed Rewards") {
        const balance0 = await getPendingReward(provider, 0)
        const balance1 = await getPendingReward(provider, 1)
        const balance2 = await getPendingReward(provider, 2)
        setBalance(Number(balance0) + Number(balance1) + Number(balance2))
      }

    })()
  }, [])

  const labelContent = <small>{label} </small>

  let labelDisplay
  if (linkTo) {
    labelDisplay = (
      <Link to={linkTo} className="hover:underline hover:text-gray-600">
        {labelContent}
      </Link>
    )
  } else {
    labelDisplay = labelContent
  }

  return (
    <Grid gap={2} cols={{ xs: 1 }}>
      <div className="text-right text-purple-700">
        {labelDisplay}
        <small>
          <span className="text-white">{balance}</span>
        </small>
      </div>
    </Grid>
  )
}
