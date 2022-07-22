import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import { WalletContextProvider } from "./components/layouts/walletContext";
import { PercentContextProvider } from "./components/layouts/PercentContext";
import { ApolloProvider, APOLLO_CLIENT } from "./graphql"

import { Store } from "./store"

import App from "./App"

import "./styles/global.css"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <PercentContextProvider>
      <WalletContextProvider>
        <ApolloProvider client={APOLLO_CLIENT}>
          <Store>
            <Router>
              <App />
            </Router>
          </Store>
        </ApolloProvider>
      </WalletContextProvider>
    </PercentContextProvider>
  </React.StrictMode>
)
