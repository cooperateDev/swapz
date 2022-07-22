import React, { useState } from 'react'

export const PercentContext = React.createContext({ percentValue: 100, setPercentValue: (param) => { } })

export const PercentContextProvider = ({ children }) => {

  const [percentValue, setPercentValue] = useState(100)

  return (
    <PercentContext.Provider value={{ percentValue: percentValue, setPercentValue: setPercentValue }}>
      {children}
    </PercentContext.Provider>
  )
}