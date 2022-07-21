import { useEffect, useRef } from "react";

import { XIcon } from "@heroicons/react/outline";

import TokenMenuItem from "./TokenMenuItem";

export default function CoinSlideOver({
  tokens,
  onChangeSelected,
  selected,
  setDisplayType,
  isSwapFrom,
}) {
  const ref = useRef(null);
  const coins = tokens;
  function onClose() {
    setDisplayType(undefined);
  }

  function onMenuItemClick(coin) {
    onChangeSelected(coin);
    onClose();
  }

  useEffect(() => ref?.current?.scrollTo(0, 0), []);

  return (
    <div className="max-h-full overflow-scroll rounded-2xl text-white">
      <div className="absolute bg-modal w-full px-6 pt-3 rounded-t-2xl">
        <div className="font-medium text-lg mb-2">
          {isSwapFrom ? "From" : "To"}
          <div
            className="inline-block float-right p-2 group hover:bg-coolGray-50 hover:border-coolGray-100 focus-within:border-coolGray-500 rounded-full -mt-1 "
            onClick={onClose}
          >
            <XIcon className="w-5 text-coolGray-500 group-hover:text-coolGray-800 focus:text-coolGray-900 " />
          </div>
        </div>
      </div>
      <div
        ref={ref}
        className=" pt-12 scrollShadow rounded-xl text-base focus:outline-none overflow-hidden z-10 w-full"
      >
        {coins.map((coin, key) => {
          return (
            <TokenMenuItem
              coin={coin}
              selected={selected}
              onClick={() => {
                onMenuItemClick(coin);
              }}
              icon={coin.icon}
              key={key}
            />
          );
        })}
      </div>
    </div>
  );
}

// function AutofocusRadioButton
