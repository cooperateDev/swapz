// const RPC_URL = "https://data-seed-prebsc-2-s1.binance.org:8545";
const RPC_URL =
    "https://testnet.velas.com/rpc/";
export const CHAIN_ID = 111;

export const STAKING_POOLS = [{
        pid: 0, //swapz token
        name: "Stablecoin 3Pool",
        lpToken: {
            111: "0xA7B0aA1D2D2AAE9a7d95D8e2A11f59D5C5f3a8E1",
            106: ""
        },
        allocPoint: 100
    },
    {
        pid: 1, //xswapz token
        name: "xSwapz",
        lpToken: {
            111: "0x120c120bA7ac52fd5c1145310aC9C1e697482773",
            106: ""
        },
        allocPoint: 100
    },
    {
        pid: 2, //swapz-busd lp token
        name: "Swapz-Busd LP",
        lpToken: {
            111: "0x264Bb72837a02e73180451426923098125aB244D",
            106: ""
        },
        allocPoint: 100
    }
];

export const BLOCK_TIME = 0.4;

export const BLOCKS_PER_DAY = 3600 * 24 / BLOCK_TIME;
export default RPC_URL;