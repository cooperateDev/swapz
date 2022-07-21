import BaseButton from "../../components/BaseButton";

export default function TradeNrvButton() {
  return (
    <div className="l p-4">
      <BaseButton
        fancy={false}
        className="rounded-xl bg-gradient-to-r from-indigo-100 to-purple-200 text-coolGray-900 py-2 px-4 w-full opacity-70 hover:shadow-indigo-2xl "
      >
        Trade $NRV
      </BaseButton>
    </div>
  );
}
