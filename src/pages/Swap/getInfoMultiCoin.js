import {
  POOLS_MAP,
  METAPOOL_ONLY_TOKENS,
  PRIORITY_RANKING,
} from "../../constants";

export function getInfoMultiCoin(primaryCoin, secondaryCoin) {
  let poolName = getRelevantPool(primaryCoin, secondaryCoin);

  const coinsInPool = POOLS_MAP[poolName];
  const coinSymbolsInPool = coinsInPool.map((i) => i.symbol);

  let otherCoin;

  if (coinSymbolsInPool.includes(secondaryCoin.symbol)) {
    otherCoin = secondaryCoin;
  } else {
    otherCoin = coinsInPool.filter((i) => i.symbol !== primaryCoin.symbol)[0];
  }

  return {
    poolName,
    otherCoin,
  };
}

function getRelevantPool(activeCoin, passiveCoin) {
  const coinSymbols = [activeCoin, passiveCoin].map((i) => i.symbol);
  const potentialPools = PRIORITY_RANKING[activeCoin.symbol];

  if (potentialPools.length === 1) {
    return potentialPools[0];
  }

  for (const token of METAPOOL_ONLY_TOKENS) {
    if (coinSymbols.includes(token.symbol)) {
      return PRIORITY_RANKING[token.symbol][0];
    }
  }

  return potentialPools[0];
}
