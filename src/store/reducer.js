export default function Reducer(state, action) {
  switch (action.type) {
    case "SET_POOLS":
      return {
        ...state,
        pools: action.payload,
      };
    case "SET_NRV_PRICE":
      return {
        ...state,
        nrvPrice: action.payload,
      };
    case "SET_BTC_PRICE":
      return {
        ...state,
        btcPrice: action.payload,
      };
    case "SET_ETH_PRICE":
      return {
        ...state,
        ethPrice: action.payload,
      };
    case "SET_BUSD_CAKE_BALANCE":
      return {
        ...state,
        cakeBUSDBalance: action.payload,
      };
    case "SET_NRV_CAKE_BALANCE":
      return {
        ...state,
        cakeNRVBalance: action.payload,
      };
    default:
      return state;
  }
}
