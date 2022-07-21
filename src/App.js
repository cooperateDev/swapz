import { Route, Routes } from "react-router-dom"
import { ToastProvider } from "react-toast-notifications"

import Swap from "./pages/Swap"
import Pools from "./pages/Pools"
import Pool from "./pages/Pool"
import Stake from "./pages/Stake"
import XNrv from "./pages/XNrv"
import Bridge from "./pages/Bridge"
import ContractInfo from "./pages/ContractInfo"
import Statistics from "./pages/Statistics"
import Portfolio from "./pages/Portfolio"
import ClaimPage from "./pages/Claim"
import Home from "./pages/Home"

import {
  SWAP_PATH,
  POOLS_PATH,
  BRIDGE_PATH,
  STAKE_PATH,
  XNRV_STAKING_PATH,
  CONTRACTS_PATH,
  PORTFOLIO_PATH,
  STATISTICS_PATH,
  CLAIM_PATH,
} from "./utils/urls"

export default function App() {
  return (
    <ToastProvider
      autoDismiss
      autoDismissTimeout={6000}
      // components={{ Toast: Snack }}
      placement="top-right"
    >
      <Routes>
        <Route exact path={SWAP_PATH} element={<Swap />} />
        {/* <Route exact path={BRIDGE_PATH} element={<Bridge />} /> */}
        <Route exact path={POOLS_PATH} element={<Pools />} />
        <Route path={`${POOLS_PATH}/:id`} element={<Pool />} />
        <Route path={STAKE_PATH} element={<Stake />} />
        <Route path={XNRV_STAKING_PATH} element={<XNrv />} />
        <Route path={CONTRACTS_PATH} element={<ContractInfo />} />
        <Route path={PORTFOLIO_PATH} element={<Portfolio />} />
        {/* <Route path={STATISTICS_PATH} element={<Statistics />} /> */}
        <Route path={CLAIM_PATH} element={<ClaimPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </ToastProvider>
  )
}
