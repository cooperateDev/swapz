import { useEffect, useState, useContext, useCallback } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { WalletContext } from "../../components/layouts/walletContext";
import RPC_URL, { CHAIN_ID } from "../../constants/constant";

export const useWalletButton = () => {
  const { provider, setProvider, walletAddress, setWalletAddress } =
    useContext(WalletContext);

  const walletButton = async () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "8043bb2cf99347b1bfadfb233c5325c0", // required
        },
      },
    };

    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: false, // optional
      disableInjectedProvider: false, // optional
      providerOptions, // required
    });

    if (provider == null) {
      const provider = await web3Modal.connect();

      const web3 = new Web3(provider);
      setProvider(web3);

      const chainId = await web3.eth.getChainId();
      if (CHAIN_ID != chainId) {
        provider.request({
          method: 'wallet_switchEthereumChain', params: [{ chainId: '0x6F' }],
        });
      }
      const accounts = await web3.eth.getAccounts();
      setWalletAddress(accounts[0]);
      localStorage.setItem(1, "walletConnect");
    } else if (localStorage.getItem(1) == "walletConnect") {

      const web3Modal = new Web3Modal({ cacheProvider: true });

      const provider = await web3Modal.connect();

      const web3 = new Web3(provider);
      setProvider(web3);

      const chainId = await web3.eth.getChainId();
      if (CHAIN_ID != chainId) {
        provider.request({
          method: 'wallet_switchEthereumChain', params: [{ chainId: '0x6F' }],
        });
      }
      const accounts = await web3.eth.getAccounts();
      setWalletAddress(accounts[0]);
    } else {
      await web3Modal.clearCachedProvider();
      setProvider(null);
      setWalletAddress(null);
      localStorage.setItem(1, "");
    }

  };
  return walletButton;
};

export default useWalletButton;
