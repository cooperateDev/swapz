import swapzAbi from "../../constants/abi/swapzToken.json";
import xswapzAbi from "../../constants/abi/xSwapz.json";
import ContractConfig from "../../constants/contractConfig";
import { CHAIN_ID } from "../../constants/constant";

export const mint = async(web3, value) => {
    if (!web3)
        return;
    const account = (await web3.eth.getAccounts())[0];
    const tokenContract = new web3.eth.Contract(swapzAbi.abi, ContractConfig.swapz[CHAIN_ID]);
    const xswapz = new web3.eth.Contract(xswapzAbi.abi, ContractConfig.xswapz[CHAIN_ID]);
    const allowance = web3.utils.fromWei(await tokenContract.methods.allowance(account, xswapz._address).call());
    if (value > allowance) {
        await tokenContract.methods.approve(xswapz._address, "0xffffffffffffffffffffffffff").send({ from: account });
    }
    await xswapz.methods.enter(web3.utils.toWei(value)).send({ from: account });
}

export const redeem = async(web3, value) => {
    if (!web3)
        return;
    const account = (await web3.eth.getAccounts())[0];
    const xswapz = new web3.eth.Contract(xswapzAbi.abi, ContractConfig.xswapz[CHAIN_ID]);
    const allowance = web3.utils.fromWei(await xswapz.methods.allowance(account, xswapz._address).call());
    if (value > allowance) {
        await xswapz.methods.approve(xswapz._address, "0xffffffffffffffffffffffffff").send({ from: account });
    }
    await xswapz.methods.leave(web3.utils.toWei(value)).send({ from: account });
}