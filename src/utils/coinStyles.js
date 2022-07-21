const COLOR_COIN_MAP = {
  yellow: ["BUSD"],
  green: ["USDT", "fUSDT"],
  lightblue: ["rUSD"],
  blue: ["USDC", "ETH", "anyETH", "UST"],
  orange: ["anyBTC", "BTCB", "BTC"],
}

let COIN_COLORS = {}

for (const [colorName, coinSymbols] of Object.entries(COLOR_COIN_MAP)) {
  for (const symbol of coinSymbols) {
    COIN_COLORS[symbol] = colorName
  }
}

export function getButtonStyleForCoin(coin) {
  switch (COIN_COLORS[coin.symbol]) {
    case "yellow":
      return "shadow-yellow-xl"
    case "green":
      return "shadow-green-xl"
    case "lightblue":
      return "shadow-lightblue-xl"
    case "blue":
      return "shadow-blue-xl"
    case "orange":
      return "shadow-orange-xl"
    default:
      return "shadow-lg"
  }
}

export function getMenuItemStyleForCoin(coin) {
  return "hover:bg-purple active:border-yellow-50"
  // switch (COIN_COLORS[coin.symbol]) {
  //   case "yellow":
  //     return "hover:border-yellow-50 active:border-yellow-50";
  //   case "green":
  //     return "hover:border-green-50 active:border-green-50";
  //   case "lightblue":
  //     return "hover:border-lightblue-50 active:border-lightblue-50";
  //   case "blue":
  //     return "hover:border-blue-50 active:border-blue-50";
  //   case "orange":
  //     return "hover:border-orange-50 active:border-orange-50";
  //   default:
  //     return "hover:border-gray-200 active:border-gray-200";
  // }
}

export function getSwapHoverStyleForCoin(coin) {
  switch (COIN_COLORS[coin.symbol]) {
    case "yellow":
      return "hover:shadow-yellow-xl border-yellow-100"
    case "green":
      return "hover:shadow-green-xl border-green-100"
    case "lightblue":
      return "hover:shadow-lightblue-xl border-lightblue-100"
    case "blue":
      return "hover:shadow-blue-xl border-blue-100"
    case "orange":
      return "hover:shadow-orange-xl border-orange-100"
    default:
      return "hover:shadow-lg border-gray-300"
  }
}

export function getMenuItemBgForCoin(coin) {
  return "bg-black"
  // switch (COIN_COLORS[coin.symbol]) {
  //   case "yellow":
  //     return "bg-yellow-50";
  //   case "green":
  //     return "bg-green-50";
  //   case "lightblue":
  //     return "bg-lightblue-50";
  //   case "blue":
  //     return "bg-blue-50";
  //   case "orange":
  //     return "bg-orange-50";
  //   default:
  //     return "bg-gray-200";
  // }
}

export function getMenuItemHoverBgForCoin(coin) {
  switch (COIN_COLORS[coin.symbol]) {
    case "yellow":
      return "hover:bg-yellow-100"
    case "green":
      return "hover:bg-green-100"
    case "lightblue":
      return "hover:bg-lightblue-100"
    case "blue":
      return "hover:bg-blue-100"
    case "orange":
      return "hover:bg-orange-100"
    default:
      return "hover:bg-gray-300"
  }
}

export function getCoinTextColor(coin) {
  switch (COIN_COLORS[coin.symbol]) {
    case "yellow":
      return "text-yellow-500 group-hover:text-yellow-400"
    case "green":
      return "text-green-600 group-hover:text-green-500"
    case "lightblue":
      return "text-lightblue-600 group-hover:text-lightblue-500"
    case "blue":
      return "text-blue-600 group-hover:text-blue-500"
    case "orange":
      return "text-orange-600 group-hover:text-orange-500"
    default:
      return "text-indigo-600 group-hover:text-indigo-500"
  }
}

export function getCardStyleByRouterIndex(poolRouterIndex) {
  switch (poolRouterIndex) {
    case "3pool":
      return "shadow-lg hover:shadow-2xl"
    case "anyETH":
      return "shadow-lg hover:shadow-2xl"
    case "ust":
      return "shadow-blue-lg hover:shadow-blue-2xl"
    case "anyBTC":
      return "shadow-orange-lg hover:shadow-orange-2xl"
    case "rusd":
      return "shadow-lightblue-lg hover:shadow-lightblue-2xl"
    case "fusdt":
      return "shadow-green-lg hover:shadow-green-2xl"
    default:
      return "shadow-lg hover:shadow-2xl"
  }
}

export function getInputBorderFocusStyleForCoin(coin) {
  switch (COIN_COLORS[coin.symbol]) {
    case "yellow":
      return "focus-within:border-yellow-200"
    case "green":
      return "focus-within:border-green-200"
    case "lightblue":
      return "focus-within:border-lightblue-200"
    case "blue":
      return "focus-within:border-blue-200"
    case "orange":
      return "focus-within:border-orange-200"
    default:
      return "focus-within:border-coolGray-300"
  }
}

export function getSwapBorderStyleForCoin(coin) {
  switch (COIN_COLORS[coin.symbol]) {
    case "yellow":
      return "border-yellow-50"
    case "green":
      return "border-green-50"
    case "lightblue":
      return "border-lightblue-50"
    case "blue":
      return "border-blue-50"
    case "orange":
      return "border-orange-50"
    default:
      return "border-gray-200"
  }
}

export function getSwapBorderHoverStyleForCoin(coin) {
  switch (COIN_COLORS[coin.symbol]) {
    case "yellow":
      return "hover:border-yellow-100"
    case "green":
      return "hover:border-green-100"
    case "lightblue":
      return "hover:border-lightblue-100"
    case "blue":
      return "hover:border-blue-100"
    case "orange":
      return "hover:border-orange-100"
    default:
      return "hover:border-gray-300"
  }
}

export function getBorderStyleForCoin(coin) {
  switch (COIN_COLORS[coin.symbol]) {
    case "yellow":
      return "border-yellow-300"
    case "green":
      return "border-green-300"
    case "lightblue":
      return "border-lightblue-300"
    case "blue":
      return "border-blue-300"
    case "orange":
      return "border-orange-300"
    default:
      return "border-coolGray-200"
  }
}

export function getFromStyleForCoin(coin) {
  switch (COIN_COLORS[coin.symbol]) {
    case "yellow":
      return "from-yellow-100"
    case "green":
      return "from-green-100"
    case "lightblue":
      return "from-lightblue-100"
    case "blue":
      return "from-blue-100"
    case "orange":
      return "from-orange-100"
    default:
      return "from-coolGray-100"
  }
}

export function getToStyleForCoin(coin) {
  switch (COIN_COLORS[coin.symbol]) {
    case "yellow":
      return "to-yellow-100"
    case "green":
      return "to-green-100"
    case "lightblue":
      return "to-lightblue-100"
    case "blue":
      return "to-blue-100"
    case "orange":
      return "to-orange-100"
    default:
      return "to-coolGray-100"
  }
}

export function getSwapCardShadowStyleForCoin(coin) {
  switch (COIN_COLORS[coin.symbol]) {
    case "yellow":
      return "shadow-yellow-xl hover:shadow-yellow-2xl"
    case "green":
      return "shadow-green-xl hover:shadow-green-2xl"
    case "lightblue":
      return "shadow-lightblue-xl hover:shadow-lightblue-2xl"
    case "blue":
      return "shadow-blue-xl hover:shadow-blue-2xl"
    case "orange":
      return "shadow-orange-xl hover:shadow-orange-2xl"
    default:
      return "shadow-xl hover:shadow-2xl"
  }
}
