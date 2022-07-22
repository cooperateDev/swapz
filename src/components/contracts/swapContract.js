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

export const swap = async (web3, fromSymbol, fromValue, toSymbol) => {

  if (web3 === null) return null;

  const accounts = await web3.eth.getAccounts()
  const dx = 0;
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

  if ((fromSymbol == "BUSD" && toSymbol == "USDT") || (fromSymbol == "BUSD" && toSymbol == "USDC")) {
    fromValue = web3.utils.toWei(fromValue, 'ether') // busd
    const busdAllowance = await busdContract.methods.allowance(accounts[0], ContractConfig.velasSwapContract[CHAIN_ID]).call()
    const busdValue = await busdContract.methods.balanceOf(accounts[0]).call()
    if (fromValue > busdValue) {
      return 0;
    } else if (web3.utils.fromWei(busdAllowance, 'ether') < fromValue) {
      await busdContract.methods
        .approve(ContractConfig.velasSwapContract[CHAIN_ID], "0xffffffffffffffffffffffffffff")
        .send({ from: accounts[0] })
        .on("receipt", () => {
          // setRefresh(refresh + 1);
        });
    }
    if (toSymbol == "USDT") {
      await contract.methods
        .swap(2, 1, fromValue, dx, deadline)
        .send({ from: accounts[0] })
        .on("receipt", () => {
          // setRefresh(refresh + 1);
        });
    } else {
      await contract.methods
        .swap(2, 0, fromValue, dx, deadline)
        .send({ from: accounts[0] })
        .on("receipt", () => {
          // setRefresh(refresh + 1);
        });
    }

  }

  if ((fromSymbol == "USDT" && toSymbol == "BUSD") || (fromSymbol == "USDT" && toSymbol == "USDC")) {
    fromValue = web3.utils.toWei(fromValue, 'mwei') // usdt
    const usdtAllowance = await usdtContract.methods.allowance(accounts[0], ContractConfig.velasSwapContract[CHAIN_ID]).call()
    const usdtValue = await usdtContract.methods.balanceOf(accounts[0]).call()
    if (fromValue > usdtValue) {
      return 0;
    } else if (web3.utils.fromWei(usdtAllowance, 'ether') < fromValue) {
      await usdtContract.methods
        .approve(ContractConfig.velasSwapContract[CHAIN_ID], "0xffffffffffffffffffffffffffff")
        .send({ from: accounts[0] })
        .on("receipt", () => {
          // setRefresh(refresh + 1);
        });
    }
    if (toSymbol == "BUSD") {
      await contract.methods
        .swap(1, 2, fromValue, dx, deadline)
        .send({ from: accounts[0] })
        .on("receipt", () => {
          // setRefresh(refresh + 1);
        });
    } else {
      await contract.methods
        .swap(1, 0, fromValue, dx, deadline)
        .send({ from: accounts[0] })
        .on("receipt", () => {
          // setRefresh(refresh + 1);
        });
    }
  }

  if ((fromSymbol == "USDC" && toSymbol == "BUSD") || (fromSymbol == "USDC" && toSymbol == "USDT")) {
    fromValue = web3.utils.toWei(fromValue, 'mwei') // usdc
    const usdcAllowance = await usdcContract.methods.allowance(accounts[0], ContractConfig.velasSwapContract[CHAIN_ID]).call()
    const usdcValue = await usdcContract.methods.balanceOf(accounts[0]).call()
    if (fromValue > usdcValue) {
      return 0;
    } else if (web3.utils.fromWei(usdcAllowance, 'ether') < fromValue) {
      await usdcContract.methods
        .approve(ContractConfig.velasSwapContract[CHAIN_ID], "0xffffffffffffffffffffffffffff")
        .send({ from: accounts[0] })
        .on("receipt", () => {
          // setRefresh(refresh + 1);
        });
    }
    if (toSymbol == "BUSD") {
      await contract.methods
        .swap(0, 2, fromValue, dx, deadline)
        .send({ from: accounts[0] })
        .on("receipt", () => {
          // setRefresh(refresh + 1);
        });
    } else {
      await contract.methods
        .swap(0, 1, fromValue, dx, deadline)
        .send({ from: accounts[0] })
        .on("receipt", () => {
          // setRefresh(refresh + 1);
        });
    }
  }

  return 1;

};

export const getCalaulateSwap = async (web3, fromSymbol, toSymbol, value) => {

  if (web3 === null) return null;

  let calculateSwapValue = 0

  const contract = new web3.eth.Contract(
    Swap_abi.abi,
    ContractConfig.velasSwapContract[CHAIN_ID]
  );

  if (value == null || value === "undefined") {
    return calculateSwapValue
  }

  if ((fromSymbol == "BUSD" && toSymbol == "USDT") || (fromSymbol == "BUSD" && toSymbol == "USDC")) {
    value = web3.utils.toWei(value, 'ether')
    if (toSymbol == "USDT") {

      calculateSwapValue = await contract.methods.calculateSwap(2, 1, value).call()
      console.log(Number(web3.utils.fromWei(calculateSwapValue, 'mwei')))
      return Number(web3.utils.fromWei(calculateSwapValue, 'mwei'))
    } else {
      calculateSwapValue = await contract.methods.calculateSwap(2, 0, value).call()
      return Number(web3.utils.fromWei(calculateSwapValue, 'mwei'))
    }
  }

  if ((fromSymbol == "USDT" && toSymbol == "BUSD") || (fromSymbol == "USDT" && toSymbol == "USDC")) {
    value = web3.utils.toWei(value, 'mwei')
    if (toSymbol == "BUSD") {
      calculateSwapValue = await contract.methods.calculateSwap(1, 2, value).call()
      return Number(web3.utils.fromWei(calculateSwapValue, 'ether'))
    } else {
      calculateSwapValue = await contract.methods.calculateSwap(1, 0, value).call()
      return Number(web3.utils.fromWei(calculateSwapValue, 'mwei'))
    }
  }

  if ((fromSymbol == "USDC" && toSymbol == "BUSD") || (fromSymbol == "USDC" && toSymbol == "USDT")) {
    value = web3.utils.toWei(value, 'mwei')
    if (toSymbol == "BUSD") {
      calculateSwapValue = await contract.methods.calculateSwap(0, 2, value).call()
      return Number(web3.utils.fromWei(calculateSwapValue, 'ether'))
    } else {
      calculateSwapValue = await contract.methods.calculateSwap(0, 1, value).call()
      return Number(web3.utils.fromWei(calculateSwapValue, 'mwei'))
    }
  }

};

export const getCoinBalance = async (web3, fromSymbol) => {

  if (web3 === null) return null;

  const accounts = await web3.eth.getAccounts()

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

  switch (fromSymbol) {
    case "BUSD":
      const busdValue = await busdContract.methods.balanceOf(ContractConfig.velasSwapContract[CHAIN_ID]).call()
      return Number(web3.utils.fromWei(busdValue, 'ether'))
    case "USDT":
      const usdtValue = await usdtContract.methods.balanceOf(ContractConfig.velasSwapContract[CHAIN_ID]).call()
      return Number(web3.utils.fromWei(usdtValue, 'mwei'))
    case "USDC":
      const usdcValue = await usdcContract.methods.balanceOf(ContractConfig.velasSwapContract[CHAIN_ID]).call()
      return Number(web3.utils.fromWei(usdcValue, 'mwei'))
    default:
      break;
  }

}