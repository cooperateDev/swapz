import { getButtonStyleForCoin } from "../../utils/coinStyles";

export default function CoinLabel({ coin }) {
  return (
    <div className="justify-self-center">
      <div
        className={`rounded-xl self-center py-2 px-2 bg-light-purple text-white ${getButtonStyleForCoin(
          coin
        )}`}
        style={{ minWidth: 96 }}
      >
        <img
          alt=""
          className="inline-block -mt-1 w-5 mr-1"
          src={coin.icon}
        ></img>
        <span className="text-md px-1 font-medium">{coin.symbol}</span>
      </div>
    </div>
  );
}
