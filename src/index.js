import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import { WalletContextProvider } from "./components/layouts/walletContext";

import { ApolloProvider, APOLLO_CLIENT } from "./graphql"

import { Store } from "./store"

import App from "./App"

import "./styles/global.css"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <WalletContextProvider>
      <ApolloProvider client={APOLLO_CLIENT}>
        <Store>
          <Router>
            <App />
          </Router>
        </Store>
      </ApolloProvider>
    </WalletContextProvider>
  </React.StrictMode>
)
