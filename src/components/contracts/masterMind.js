import swapzAbi from "../../constants/abi/swapzToken.json";
import xswapzAbi from "../../constants/abi/xSwapz.json";
import masterAbi from "../../constants/abi/masterMind.json";
import erc20Abi from "../../constants/abi/busdAbi.json";
import ContractConfig from "../../constants/contractConfig";
import { getVirtualPrice } from "./liquidityContract";
import { CHAIN_ID, STAKING_POOLS, BLOCKS_PER_DAY } from "../../constants/constant";

export const getSwapzPrice = async(web3) => {
    const swapzToken = new web3.eth.Contract(swapzAbi.abi, ContractConfig.swapz[CHAIN_ID]);
    const busd = new web3.eth.Contract(erc20Abi, ContractConfig.busdContract[CHAIN_ID]);
    // const lpTokenAddress = new web3.eth.Contract(erc20Abi.abi, STAKING_POOLS[2].lpToken[CHAIN_ID]);
    const swapzBalance = web3.utils.fromWei(await swapzToken.methods.balanceOf(STAKING_POOLS[2].lpToken[CHAIN_ID]).call());
    const busdBalance = web3.utils.fromWei(await busd.methods.balanceOf(STAKING_POOLS[2].lpToken[CHAIN_ID]).call());
    return busdBalance / swapzBalance;
}

export const getxSwapzPrice = async(web3) => {
    const swapzToken = new web3.eth.Contract(swapzAbi.abi, ContractConfig.swapz[CHAIN_ID]);
    const xswapz = new web3.eth.Contract(xswapzAbi.abi, ContractConfig.xswapz[CHAIN_ID]);
    const swapzBalance = web3.utils.fromWei(await swapzToken.methods.balanceOf(xswapz.address).call());
    const xswapzSupply = web3.utils.fromWei(await xswapz.methods.totalSupply().call());

    return swapzBalance / xswapzSupply * (await getSwapzPrice(web3));
}

export const getSwapzBusdLPPrice = async(web3) => {
    const swapzToken = new web3.eth.Contract(swapzAbi.abi, ContractConfig.swapz[CHAIN_ID]);
    const busd = new web3.eth.Contract(erc20Abi, ContractConfig.busdContract[CHAIN_ID]);
    const lpToken = new web3.eth.Contract(erc20Abi, STAKING_POOLS[2].lpToken[CHAIN_ID]);
    const lpTokenSupply = web3.utils.fromWei(await swapzToken.methods.totalSupply().call());
    const busdBalance = web3.utils.fromWei(await busd.methods.balanceOf(lpToken._address).call());
    return busdBalance * 2 / lpTokenSupply;
}

export const getApr = async(web3, pid, days = 1) => {
    let tokenPrice;
    const swapzPrice = await getSwapzPrice(web3);
    const tokenContract = new web3.eth.Contract(erc20Abi, STAKING_POOLS[pid].lpToken[CHAIN_ID]);
    const tokenBalance = web3.utils.fromWei(await tokenContract.methods.balanceOf(ContractConfig.masterMind[CHAIN_ID]).call());
    if (tokenBalance == 0)
        return "∞";
    const masterMind = new web3.eth.Contract(masterAbi.abi, ContractConfig.masterMind[CHAIN_ID]);
    if (pid == 0) {
        tokenPrice = await getVirtualPrice(web3);
    } else if (pid == 1) {
        tokenPrice = await getxSwapzPrice(web3);
    } else if (pid == 2) {
        tokenPrice = await getSwapzBusdLPPrice(web3);
    }
    const currentBlock = await web3.eth.getBlockNumber();
    const endBlock = currentBlock + BLOCKS_PER_DAY * days;
    const totalAllocPoint = await masterMind.methods.totalAllocPoint().call();
    const multiplier = await masterMind.methods.getMultiplier(currentBlock, endBlock).call();
    const swapzPerblock = web3.utils.fromWei(await masterMind.methods.swapzPerBlock().call());

    console.log(tokenBalance, tokenPrice)
    return (swapzPerblock * swapzPrice * multiplier * STAKING_POOLS[pid].allocPoint / totalAllocPoint / (tokenBalance * tokenPrice) * 100).toFixed(2);
}

export const getStakedTokenBalance = async(web3, pid) => {
    if (!web3)
        return 0;
    const account = (await web3.eth.getAccounts())[0];
    const masterMind = new web3.eth.Contract(masterAbi.abi, ContractConfig.masterMind[CHAIN_ID]);
    const userInfo = await masterMind.methods.userInfo(pid, account).call();
    return web3.utils.fromWei(userInfo.amount);
}

export const getTokenBalance = async(web3, token, address = null) => {
    if (!web3)
        return 0;
    let account = (await web3.eth.getAccounts())[0];
    const tokenContract = new web3.eth.Contract(erc20Abi, token);
    if (address != null)
        account = address;
    return web3.utils.fromWei(await tokenContract.methods.balanceOf(account).call());
}

export const getPendingReward = async(web3, pid) => {
    if (!web3)
        return 0;
    const account = (await web3.eth.getAccounts())[0];
    const masterMind = new web3.eth.Contract(masterAbi.abi, ContractConfig.masterMind[CHAIN_ID]);

    return web3.utils.fromWei(await masterMind.methods.pendingSwapz(pid, account).call());
}

export const poolDeposit = async(web3, pid, value) => {
    if (!web3)
        return;
    const account = (await web3.eth.getAccounts())[0];
    const tokenContract = new web3.eth.Contract(erc20Abi, STAKING_POOLS[pid].lpToken[CHAIN_ID]);
    const masterMind = new web3.eth.Contract(masterAbi.abi, ContractConfig.masterMind[CHAIN_ID]);
    const allowance = web3.utils.fromWei(await tokenContract.methods.allowance(account, masterMind._address).call());
    if (value > allowance) {
        await tokenContract.methods.approve(masterMind._address, "0xffffffffffffffffffffffffff").send({ from: account });
    }
    await masterMind.methods.deposit(pid, web3.utils.toWei(value)).send({ from: account });
}

export const poolWithdraw = async(web3, pid, value) => {
    if (!web3)
        return;
    const account = (await web3.eth.getAccounts())[0];
    const masterMind = new web3.eth.Contract(masterAbi.abi, ContractConfig.masterMind[CHAIN_ID]);
    await masterMind.methods.withdraw(pid, web3.utils.toWei(value)).send({ from: account });
}