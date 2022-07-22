import { useRef, useState, useContext, useEffect } from "react"
import { WalletContext } from "../../components/layouts/walletContext"

import Card from "../../components/tailwind/Card"
import InteractiveInputRow from "../../components/InteractiveInputRow"

import {
  getTokenBalance
} from "../../components/contracts/masterMind"

import {
  mint, redeem
} from "../../components/contracts/xSwapz"

import { CHAIN_ID } from "../../constants/constant"
import { ToastContainer, toast } from 'react-toastify'
import contractConfig from "../../constants/contractConfig"

export default function XNRVForm() {
  const { provider, setProvider, walletAddress, setWalletAddress } = useContext(WalletContext)

  const [deposit, setDeposit] = useState("")
  const [withdraw, setWithdraw] = useState("")

  const mintRef = useRef(null)
  const redeemRef = useRef(null)

  const [swapzBalance, setSwapzBalance] = useState(0)
  const [xswapzBalance, setxSwapzBalance] = useState(0)

  const [minting, setMinting] = useState(false)
  const [redeeming, setRedeeming] = useState(false)

  useEffect(()=>{
    const gettingData = async() => {
      setSwapzBalance(await getTokenBalance(provider, contractConfig.swapz[CHAIN_ID]));
      setxSwapzBalance(await getTokenBalance(provider, contractConfig.xswapz[CHAIN_ID]));
    }
    gettingData();
  })

  return (
    <Card title="xNRV Mint">
      <div className="mt-4">
        <InteractiveInputRow
          title="Mint"
          balanceStr={"0.0"}
          onClickBalance={() => {
            setDeposit(swapzBalance)
          }}
          value={deposit}
          placeholder={"0.0"}
          onChange={(e) => setDeposit(e.target.value)}
          buttonLabel="Mint xNRV"
          inputRef={mintRef}
          disabled={minting}
          onClickEnter={async (value) => {
            if(Number(value) <= Number(swapzBalance))
            {
              setMinting(true)
              try{
                await mint(provider, value);
              }catch(ex){}
              setMinting(false)
            }
            else
            {
              toast.error('Insufficient balance', {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
              });
            }
          }}
        />
        <InteractiveInputRow
          title="Redeem"
          balanceStr={"0.0"}
          onClickBalance={() => {
            setWithdraw(xswapzBalance)
          }}
          value={withdraw}
          placeholder={"0.0"}
          onChange={(e) => setWithdraw(e.target.value)}
          buttonLabel="Redeem NRV"
          inputRef={redeemRef}
          disabled={redeeming}
          onClickEnter={async (value) => {
            if(Number(value) <= Number(xswapzBalance))
            {
              setRedeeming(true)
              try{
                await redeem(provider, value);
              }catch(ex){}
              setRedeeming(false)
            }
            else
            {
              toast.error('Insufficient balance', {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
              });
            }
          }}
        />
      </div>
      <ToastContainer
        autoClose={3000}
        className="toast-container"
        toastClassName="dark-toast"
        toastStyle={{
          top: "5rem",
          right: "2rem"
        }} />
    </Card>
  )
}
