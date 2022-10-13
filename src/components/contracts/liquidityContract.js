import Web3 from "web3";
import Swap_abi from "../../constants/abi/swap.json";
import busdAbi from "../../constants/abi/busdAbi.json";
import usdtAbi from "../../constants/abi/usdtAbi.json";
import usdcAbi from "../../constants/abi/usdcAbi.json";
import RPC_URL, { CHAIN_ID } from "../../constants/constant";
import ContractConfig from "../../constants/contractConfig";

export const getWeb3 = () => {
  const readProvider = new Web3(RPC_URL);
  return readProvider;
};

export const addLiquidity = async (web3, tokens) => {

  if (web3 === null) return null;

  const minToMint = 0;
  let deadline = Math.floor(new Date().getTime() / 1000 + (20 * 60))
  const accounts = await web3.eth.getAccounts()

  let arrayValue;
  arrayValue = tokens.map(item => {
    return (
      Number(item.tokenRef.current.value)
    )
  }
  )
  arrayValue[2] = web3.utils.toWei(tokens[0].tokenRef.current.value, 'ether') // busd
  arrayValue[1] = web3.utils.toWei(tokens[1].tokenRef.current.value, 'mwei') // usdt
  arrayValue[0] = web3.utils.toWei(tokens[2].tokenRef.current.value, 'mwei') // usdc

  const contract = new web3.eth.Contract(
    Swap_abi.abi,
    ContractConfig.velasSwapContract[CHAIN_ID]
  );
  const busdContract = new web3.eth.Contract(
    busdAbi,
    ContractConfig.busdContract[CHAIN_ID]
  );
  const usdtContract = new web3.eth.Contract(
    usdtAbi,
    ContractConfig.usdtContract[CHAIN_ID]
  );
  const usdcContract = new web3.eth.Contract(
    usdcAbi,
    ContractConfig.usdcContract[CHAIN_ID]
  );

  const busdAllowance = await busdContract.methods.allowance(accounts[0], ContractConfig.velasSwapContract[CHAIN_ID]).call()
  const busdValue = await busdContract.methods.balanceOf(accounts[0]).call()
  if (arrayValue[0] > busdValue) {
    return 0;
  } else if (web3.utils.fromWei(busdAllowance, 'ether') < arrayValue[0]) {
    await busdContract.methods
      .approve(ContractConfig.velasSwapContract[CHAIN_ID], "0xffffffffffffffffffffffffffff")
      .send({ from: accounts[0] })
      .on("receipt", () => {
        // setRefresh(refresh + 1);
      });
  }
  const usdtAllowance = await usdtContract.methods.allowance(accounts[0], ContractConfig.velasSwapContract[CHAIN_ID]).call()
  const usdtValue = await usdtContract.methods.balanceOf(accounts[0]).call()
  if (arrayValue[1] > usdtValue) {
    return 0;
  } else if (web3.utils.fromWei(usdtAllowance, 'ether') < arrayValue[0]) {
    await usdtContract.methods
      .approve(ContractConfig.velasSwapContract[CHAIN_ID], "0xffffffffffffffffffffffffffff")
      .send({ from: accounts[0] })
      .on("receipt", () => {
        // setRefresh(refresh + 1);
      });
  }
  const usdcAllowance = await usdcContract.methods.allowance(accounts[0], ContractConfig.velasSwapContract[CHAIN_ID]).call()
  const usdcValue = await usdcContract.methods.balanceOf(accounts[0]).call()
  if (arrayValue[2] > usdcValue) {
    return 0;
  } else if (web3.utils.fromWei(usdcAllowance, 'ether') < arrayValue[0]) {
    await usdcContract.methods
      .approve(ContractConfig.velasSwapContract[CHAIN_ID], "0xffffffffffffffffffffffffffff")
      .send({ from: accounts[0] })
      .on("receipt", () => {
        // setRefresh(refresh + 1);
      });
  }

  await contract.methods
    .addLiquidity(arrayValue, minToMint, deadline)
    .send({ from: accounts[0] })
    .on("receipt", () => {
      // setRefresh(refresh + 1);
    });

  return 1;

};

export const removeLiquidity = async (web3, withdrawType, percentValue, tokens) => {

  if (web3 === null) return null;

  const accounts = await web3.eth.getAccounts()
  let deadline = Math.floor(new Date().getTime() / 1000 + (20 * 60))

  const contract = new web3.eth.Contract(
    Swap_abi.abi,
    ContractConfig.velasSwapContract[CHAIN_ID]
  );
  const busdContract = new web3.eth.Contract(
    busdAbi,
    ContractConfig.busdContract[CHAIN_ID]
  );
  const usdtContract = new web3.eth.Contract(
    usdtAbi,
    ContractConfig.usdtContract[CHAIN_ID]
  );
  const usdcContract = new web3.eth.Contract(
    usdcAbi,
    ContractConfig.usdcContract[CHAIN_ID]
  );
  const lpTokenContract = new web3.eth.Contract(
    busdAbi,
    ContractConfig.lpToken1[CHAIN_ID]
  );

  let arrayValue;
  arrayValue = tokens.map(item => {
    return (
      Number(item.tokenRef.current.value)
    )
  }
  )

  if (withdrawType == "All") {
    const lpTokenAllowance = await lpTokenContract.methods.allowance(accounts[0], ContractConfig.lpToken1[CHAIN_ID]).call()
    if (lpTokenAllowance < lpTokenBalance) {
      await lpTokenContract.methods
        .approve(ContractConfig.velasSwapContract[CHAIN_ID], "0xffffffffffffffffffffffffffff")
        .send({ from: accounts[0] })
        .on("receipt", () => {
          // setRefresh(refresh + 1);
        });
    }
    const lpTokenBalance = await lpTokenContract.methods.balanceOf(accounts[0]).call()
    let lpTokenBalanceTemp = Number(web3.utils.fromWei(lpTokenBalance, 'ether')) / 100 * percentValue
    let lpTokenArrayValue = await contract.methods.calculateRemoveLiquidity(accounts[0], web3.utils.toWei(lpTokenBalanceTemp, 'ether')).call()
    await contract.methods
      .removeLiquidity(lpTokenBalance / 100 * percentValue, lpTokenArrayValue, deadline)
      .send({ from: accounts[0] })
      .on("receipt", () => {
        // setRefresh(refresh + 1);
      });
  }
  if (withdrawType == "BUSD") {
    let arrayValue;
    arrayValue = tokens.map(item => {
      return (
        Number(item.tokenRef.current.value)
      )
    }
    )
    arrayValue[0] = web3.utils.toWei(tokens[0].tokenRef.current.value, 'ether')
    const lpTokenBalance = await lpTokenContract.methods.balanceOf(accounts[0]).call()
    if (arrayValue[0] > lpTokenBalance) {
      return 0
    }
    const busdAllowance = await busdContract.methods.allowance(accounts[0], ContractConfig.velasSwapContract[CHAIN_ID]).call()
    let busdArrayValue = await contract.methods.calculateRemoveLiquidityOneToken(accounts[0], arrayValue[0], 2).call()
    if (busdAllowance < busdArrayValue) {
      await busdContract.methods
        .approve(ContractConfig.velasSwapContract[CHAIN_ID], "0xffffffffffffffffffffffffffff")
        .send({ from: accounts[0] })
        .on("receipt", () => {
          // setRefresh(refresh + 1);
        });
    }
    await contract.methods
      .removeLiquidityOneToken(arrayValue[0], 2, busdArrayValue, deadline)
      .send({ from: accounts[0] })
      .on("receipt", () => {
        // setRefresh(refresh + 1);
      });
  }
  if (withdrawType == "USDT") {
    let arrayValue;
    arrayValue = tokens.map(item => {
      return (
        Number(item.tokenRef.current.value)
      )
    }
    )
    arrayValue[1] = web3.utils.toWei(arrayValue[1], 'mwei')
    const lpTokenBalance = await lpTokenContract.methods.balanceOf(accounts[0]).call()
    if (arrayValue[1] > lpTokenBalance) {
      return 0
    }
    const usdtAllowance = await usdtContract.methods.allowance(accounts[0], ContractConfig.velasSwapContract[CHAIN_ID]).call()
    let usdtArrayValue = await contract.methods.calculateRemoveLiquidityOneToken(accounts[0], arrayValue[1], 1).call()
    if (usdtAllowance < usdtArrayValue) {
      await usdtContract.methods
        .approve(ContractConfig.velasSwapContract[CHAIN_ID], "0xffffffffffffffffffffffffffff")
        .send({ from: accounts[0] })
        .on("receipt", () => {
          // setRefresh(refresh + 1);
        });
    }
    await contract.methods
      .removeLiquidityOneToken(arrayValue[1], 1, usdtArrayValue, deadline)
      .send({ from: accounts[0] })
      .on("receipt", () => {
        // setRefresh(refresh + 1);
      });
  }
  if (withdrawType == "USDC") {
    let arrayValue;
    arrayValue = tokens.map(item => {
      return (
        Number(item.tokenRef.current.value)
      )
    }
    )
    arrayValue[2] = web3.utils.toWei(arrayValue[2], 'ether')
    const lpTokenBalance = await lpTokenContract.methods.balanceOf(accounts[0]).call()
    if (arrayValue[2] > lpTokenBalance) {
      return 0
    }
    const usdcAllowance = await usdcContract.methods.allowance(accounts[0], ContractConfig.velasSwapContract[CHAIN_ID]).call()
    let usdcArrayValue = await contract.methods.calculateRemoveLiquidityOneToken(accounts[0], arrayValue[2], 0).call()
    if (usdcAllowance < usdcArrayValue) {
      await usdcContract.methods
        .approve(ContractConfig.velasSwapContract[CHAIN_ID], "0xffffffffffffffffffffffffffff")
        .send({ from: accounts[0] })
        .on("receipt", () => {
          // setRefresh(refresh + 1);
        });
    }
    await contract.methods
      .removeLiquidityOneToken(arrayValue[2], 0, usdcArrayValue, deadline)
      .send({ from: accounts[0] })
      .on("receipt", () => {
        // setRefresh(refresh + 1);
      });
  }
  if (withdrawType != "All" && arrayValue[0] != "" && arrayValue[1] != "" && arrayValue[2] != "") {

    arrayValue[2] = web3.utils.toWei(tokens[0].tokenRef.current.value, 'ether') // busd
    arrayValue[1] = web3.utils.toWei(tokens[1].tokenRef.current.value, 'mwei') // usdt
    arrayValue[0] = web3.utils.toWei(tokens[2].tokenRef.current.value, 'mwei') // usdc
    const lpTokenAllowance = await lpTokenContract.methods.allowance(accounts[0], ContractConfig.lpToken1[CHAIN_ID]).call()
    const lpTokenBalance = await lpTokenContract.methods.balanceOf(accounts[0]).call()
    if (lpTokenAllowance < lpTokenBalance) {
      await lpTokenContract.methods
        .approve(ContractConfig.velasSwapContract[CHAIN_ID], "0xffffffffffffffffffffffffffff")
        .send({ from: accounts[0] })
        .on("receipt", () => {
          // setRefresh(refresh + 1);
        });
    }
    await contract.methods
      .removeLiquidityImbalance(arrayValue, lpTokenBalance, deadline)
      .send({ from: accounts[0] })
      .on("receipt", () => {
        // setRefresh(refresh + 1);
      });
  }

  return 1

}

export const getBUSDValue = async (web3) => {

  const contract = new web3.eth.Contract(
    busdAbi,
    ContractConfig.busdContract[CHAIN_ID]
  );

  let busdValue = await contract.methods.balanceOf(ContractConfig.velasSwapContract[CHAIN_ID]).call()

  return Number(web3.utils.fromWei(busdValue, 'ether'))

};

export const getUSDTValue = async (web3) => {

  const contract = new web3.eth.Contract(
    usdtAbi,
    ContractConfig.usdtContract[CHAIN_ID]
  );

  let usdtValue = await contract.methods.balanceOf(ContractConfig.velasSwapContract[CHAIN_ID]).call()

  return Number(web3.utils.fromWei(usdtValue, 'mwei'))

};

export const getUSDCValue = async (web3) => {

  const contract = new web3.eth.Contract(
    usdcAbi,
    ContractConfig.usdcContract[CHAIN_ID]
  );

  let usdcValue = await contract.methods.balanceOf(ContractConfig.velasSwapContract[CHAIN_ID]).call()

  return Number(web3.utils.fromWei(usdcValue, 'mwei'))

};

export const getTradingFee = async (web3) => {

  const contract = new web3.eth.Contract(
    Swap_abi.abi,
    ContractConfig.velasSwapContract[CHAIN_ID]
  );

  let swapStorage = await contract.methods.swapStorage().call()
  const tradingFee = swapStorage.swapFee

  return tradingFee

};

export const getDepositFee = async (web3) => {

  const contract = new web3.eth.Contract(
    Swap_abi.abi,
    ContractConfig.velasSwapContract[CHAIN_ID]
  );

  let swapStorage = await contract.methods.swapStorage().call()
  const depositFee = swapStorage.defaultDepositFee

  return depositFee

};

export const getVirtualPrice = async (web3) => {

  const contract = new web3.eth.Contract(
    Swap_abi.abi,
    ContractConfig.velasSwapContract[CHAIN_ID]
  );

  let virtualPrice = await contract.methods.getVirtualPrice().call()

  return Number(web3.utils.fromWei(virtualPrice, 'ether'))

};

// export const getTotalLiquidity = async (web3) => {

//   const contract = new web3.eth.Contract(
//     busdAbi,
//     ContractConfig.lpToken1[CHAIN_ID]
//   );

//   let totalLiquidity = await contract.methods.totalSupply().call()

//   return Number(web3.utils.fromWei(totalLiquidity, 'ether'))

// };

