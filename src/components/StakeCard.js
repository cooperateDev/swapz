import { useEffect, useRef, useState, useContext } from "react"

import Card from "../components/tailwind/Card"

import { WalletContext } from "../components/layouts/walletContext"
import ApyTooltip from "../components/ApyTooltip"
import BaseButton from "../components/BaseButton"
import InteractiveInputRow from "../components/InteractiveInputRow"
import {
  getApr,
  getTokenBalance,
  getStakedTokenBalance,
  getPendingReward,
  poolDeposit,
  poolWithdraw
} from "./contracts/masterMind"
import { getWeb3 } from "./contracts/liquidityContract"
import { CHAIN_ID, STAKING_POOLS } from "../constants/constant"
import { ToastContainer, toast } from 'react-toastify'

export default function StakeCard({
  pid,
  poolName,
  poolLabel,
  rightContent = false,
}) {
  const { provider, setProvider, walletAddress, setWalletAddress } = useContext(WalletContext)
  const pool = STAKING_POOLS[pid];
  const [deposit, setDeposit] = useState("")
  const [withdraw, setWithdraw] = useState("")

  const depositRef = useRef(null)
  const withdrawRef = useRef(null)

  const claim = async () => {
    if(pendingReward > 0) {
      setClaiming(true);
      try{
        await deposit(web3, pid, 0);
      }catch(ex){

      }
      setClaiming(false);
    }
  }

  const [apr, setApr] = useState("0");

  const web3 = getWeb3();

  const [tokenBalance, setTokenBalance] = useState(0);
  const [stakedBalance, setStakedBalance] = useState(0);
  const [pendingReward, setPendingReward] = useState(0);

  const [depositing, setDepositing] = useState(false);
  const [withDrawing, setWithdrawing] = useState(false);
  const [claiming, setClaiming] = useState(false);

  useEffect(()=>{
    const setData = async () => {
      setApr(await getApr(web3, pid));
      setTokenBalance(await getTokenBalance(provider, pool.lpToken[CHAIN_ID]));
      setStakedBalance(await getStakedTokenBalance(provider, pid));
      setPendingReward(Number(await getPendingReward(provider, pid)));
    }
    setData();
  })
  return (
    <Card
      title={
        <>
          <div className="text-16 xs:text-input">
            {poolLabel ?? poolName} Staking
          </div>
          <div className="flex text-16 xs:text-input">
            <div>Earning {apr}% APR</div>
            <ApyTooltip className="ml-1" />
          </div>
        </>
      }
      btn={rightContent}
    >
      <div className="mt-4">
        <InteractiveInputRow
          title="Stake"
          disabled={depositing}
          balanceStr={"0.0"}
          onClickBalance={() => {
            setDeposit(tokenBalance)
          }}
          onClickEnter={async (value) => {
            setDepositing(true);
            if(Number(value) <= Number(tokenBalance))
            {
              try{
                await poolDeposit(provider, pid, value);
              }catch(ex){}
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
            setDepositing(false);
          }}
          placeholder={"0.0"}
          onChange={(e) => setDeposit(e.target.value)}
          value={deposit}
          inputRef={depositRef}
        />
        <InteractiveInputRow
          title="Unstake"
          balanceStr={"0.0"}
          disabled={withDrawing}
          onClickBalance={() => {
            setWithdraw(stakedBalance)
          }}
          value={withdraw}
          placeholder={"0.0"}
          onChange={(e) => setWithdraw(e.target.value)}
          inputRef={withdrawRef}
          onClickEnter={async (value) => {
            setWithdrawing(true);
            if(Number(value) <= Number(stakedBalance))
            {
              try{
                await poolWithdraw(provider, pid, value);
              }catch(ex){}
            }
            else
            {
              toast.error('Insufficient staked balance', {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
              });
            }
            setWithdrawing(false);
          }}
        />
        <div className="mt-6">
          <BaseButton
            fancy={true}
            disabled={claiming}
            className="w-full py-4 rounded-full text-dark-blue"
            onClick={()=> claim()}
          >
            Claim {pendingReward.toFixed(3)} NRV
          </BaseButton>
        </div>
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
