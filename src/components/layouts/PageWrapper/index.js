import { useContext, useState, useEffect, useMemo } from "react"

import { Transition } from "@headlessui/react"

import { useKeyPress } from "../../../hooks/useKeyPress"

import { WalletContext } from "../../../components/layouts/walletContext";
import { useWalletButton } from "../../../components/layouts/useWalletButton";

import {
  POOLS_PATH,
  // BRIDGE_PATH,
  STAKE_PATH,
  XNRV_STAKING_PATH,
  CONTRACTS_PATH,
  PORTFOLIO_PATH,
  STATISTICS_PATH,
  CLAIM_PATH,
  NERVE_HOME_URL,
} from "../../../utils/urls"

import Grid from "../../../components/tailwind/Grid"
import Col from "../../../components/tailwind/Col"

// import BridgeIcon from "../../../components/icons/BridgeIcon"
import ContractsIcon from "../../../components/icons/ContractsIcon"
import PoolsIcon from "../../../components/icons/PoolsIcon"
import StackIcon from "../../../components/icons/StackIcon"
import StakeIcon from "../../../components/icons/StakeIcon"
import DollarIcon from "../../../components/icons/DollarIcon"
import ChartBarIcon from "../../../components/icons/ChartBarIcon"
import ChartPieIcon from "../../../components/icons/ChartPieIcon"
import NerveLogoSvg from "../../../components/icons/NerveLogoSvg"

import SidebarNavLink from "./SidebarNavLink"
import OpenButton from "./OpenButton"
import BaseButton from "../../BaseButton"

export default function PageWrapper({ children }) {
  const [open, setOpen] = useState(false)
  const escPressed = useKeyPress("Escape")
  const { provider, setProvider, walletAddress, setWalletAddress } =
    useContext(WalletContext)
  const walletButton = useWalletButton()

  useMemo(() => {
    if (localStorage.getItem(1) == "walletConnect") {
      walletButton();
    }
  }, [])

  const onClick = () => {
    setOpen(!open)
  }

  const escEffect = () => {
    if (escPressed) {
      setOpen(false)
    }
  }

  useEffect(escEffect, [escPressed])

  const navBlock = (
    <>
      <div className="flex border-custom text-white w-full justify-between align-center header-container z-50">
        <a href={"/"}>
          <div className="flex items-center flex-shrink-0 px-4 py-1 ">
            <div className="mr-2">
              <NerveLogoSvg />
            </div>
            <div className=" font-medium text-2xl tracking-wider pl-2 ">
              <span className="hidden xs:logo-text bg-clip-text  bg-gradient-to-r text-transparent from-purple-600 to-blue-600 hover:animate-pulse active:from-purple-700 active:to-blue-700 transform transition-all">
                Stable Swapz
              </span>
            </div>
          </div>
        </a>
        <Col xl={8}>
          <div className="hidden nav-header md:visible-menu">
            <SidebarNavLink to="/" labelText="Swap" />
            {/* <SidebarNavLink to={BRIDGE_PATH} labelText="Bridge" /> */}
            <SidebarNavLink to={POOLS_PATH} labelText="Pools" />
            <SidebarNavLink to={STAKE_PATH} labelText="Stake" />
            <SidebarNavLink to={XNRV_STAKING_PATH} labelText="xSwapz" />
            <SidebarNavLink to={CONTRACTS_PATH} labelText="Contract Info" />
            <SidebarNavLink to={PORTFOLIO_PATH} labelText="Portfolio" />
            {/* <SidebarNavLink to={STATISTICS_PATH} labelText="Statistics" /> */}
            {/* <SidebarNavLink to={CLAIM_PATH} labelText="Claim" /> */}
          </div>
        </Col>
        <div className="flex align-center">
          <div className="md:hidden-icon ">
            <OpenButton onClick={onClick} />
          </div>
          <div className="space-y-1">
            <BaseButton
              type="button"
              className={`w-full cursor-pointer px-0 py-0 rounded-lg focus:outline-none `}
              fancy={true}
              onClick={() => walletButton()}
            >
              <span className="px-2">{walletAddress
                ? `${walletAddress.substr(0, 6)}...${walletAddress.substr(-4)}`
                : `Connect Wallet`}</span>
            </BaseButton>
          </div>
        </div>
      </div >
    </>
  )

  const responsiveBlock = (
    <Grid
      cols={{ xs: 1 }}
      gapY={1}
      as="nav"
      className="mt-4 px-2 text-white"
      style={{ paddingTop: "100px" }}
    >
      <SidebarNavLink to="/" labelText="Swap" IconComponent={StackIcon} />
      {/* <SidebarNavLink
        to={BRIDGE_PATH}
        labelText="Bridge"
        IconComponent={BridgeIcon}
      /> */}
      <SidebarNavLink
        to={POOLS_PATH}
        labelText="Pools"
        IconComponent={PoolsIcon}
      />
      <SidebarNavLink
        to={STAKE_PATH}
        labelText="Stake"
        IconComponent={StakeIcon}
      />
      <SidebarNavLink
        to={XNRV_STAKING_PATH}
        labelText="xSWAPZ"
        IconComponent={DollarIcon}
      />
      <SidebarNavLink
        to={CONTRACTS_PATH}
        labelText="Contract Info"
        IconComponent={ContractsIcon}
      />
      <SidebarNavLink
        to={PORTFOLIO_PATH}
        labelText="Portfolio"
        IconComponent={ChartPieIcon}
      />
      {/* <SidebarNavLink
        to={STATISTICS_PATH}
        labelText="Statistics"
        IconComponent={ChartBarIcon}
      /> */}
      {/* <SidebarNavLink
        to={CLAIM_PATH}
        labelText="Claim"
        IconComponent={DollarIcon}
      /> */}
    </Grid>
  )

  return (
    <div className="h-screen flex overflow-y-auto bg-tea">
      {/* Static sidebar for desktop */}
      <div className="bg-tea flex flex-shrink-0 shadow-sm">{navBlock}</div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div
          className="static inset-0 flex z-40 md:hidden-icon "
          role="dialog"
          aria-modal="true"
        >
          <Transition
            className="fixed inset-0  transition-all backdrop-filter backdrop-blur-sm  "
            aria-hidden="true"
            show={open}
            enter=" duration-75"
            enterFrom="bg-opacity-50 backdrop-grayscale-0"
            enterTo="bg-opacity-100 backdrop-grayscale-[0.5]"
            leave=" duration-150"
            leaveFrom="bg-opacity-100 backdrop-grayscale-[0.5]"
            leaveTo="bg-opacity-50 backdrop-grayscale-0"
          />

          <Transition
            className="absolute h-screen sm:flex-1 flex flex-col sm:max-w-sm bg-tea border-custom w-screen sm:w-64"
            show={open}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            {responsiveBlock}
          </Transition>
        </div>
        <main className="flex-1 relative overflow-y-auto md-0 focus:outline-none mt-100">
          {children}
        </main>
      </div>
    </div>
  )
}
