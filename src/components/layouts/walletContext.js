import React, { useState } from 'react'

export const WalletContext = React.createContext({ provider: null, setProvider: (param) => { }, walletAddress: '', setWalletAddress: (address) => { } })

export const WalletContextProvider = ({ children }) => {

  const [provider, setProvider] = useState(null)
  const [walletAddress, setWalletAddress] = useState('');

  return (
    <WalletContext.Provider value={{ provider: provider, setProvider: setProvider, walletAddress: walletAddress, setWalletAddress: setWalletAddress }}>
      {children}
    </WalletContext.Provider>
  )
}