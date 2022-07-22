import { useEffect, useState, useContext } from "react"

import BalanceInputContainer from "../components/BalanceInputContainer"
import BaseButton from "../components/BaseButton"
import { PercentContext } from "../components/layouts/PercentContext"

import {
  getWeb3,
  getBUSDValue,
  getUSDTValue,
  getUSDCValue,
} from "../components/contracts/liquidityContract"

export default function InteractiveInputRow({
  title,
  balanceStr,
  onClickBalance,
  value,
  placeholder,
  onChange,
  disabled,
  onClickEnter,
  buttonLabel,
  icon,
  showButton = true,
  inputRef,
  tap
}) {

  const [balanceValue, setBalanceValue] = useState()
  const { percentValue, setPercentValue } =
    useContext(PercentContext)
  const [inputValue, setInputValue] = useState();

  useEffect(() => {
    const f = async () => {
      const readProvider = getWeb3()
      const busdValue = await getBUSDValue(readProvider)
      const usdtValue = await getUSDTValue(readProvider)
      const usdcValue = await getUSDCValue(readProvider)

      switch (title) {
        case "BUSD":
          setBalanceValue(busdValue.toFixed(2));
          setInputValue(busdValue / 100 * percentValue)
          break;
        case "USDT":
          setBalanceValue(usdtValue.toFixed(2));
          setInputValue(usdtValue / 100 * percentValue)
          break;
        case "USDC":
          setBalanceValue(usdcValue.toFixed(2));
          setInputValue(usdcValue / 100 * percentValue)
          break;
        default:
          break;
      }
    };
    f()
  }, [percentValue])

  let titleContent
  if (icon) {
    titleContent = (
      <div className="inline-block pb-1">
        <img className="w-5 mr-2.5 -mt-1 inline-block" alt="icon" src={icon} />
        <div className="inline-block ">{title}</div>
      </div>
    )
  } else {
    titleContent = title
  }

  const getInputValue = () => {
    onClickEnter(inputRef.current.value);
  }

  return (
    <div className="mt-4">
      <div className="inline-flex items-center space-x-2 w-full">
        <BalanceInputContainer
          title={titleContent}
          balanceStr={balanceValue}
          className="w-full"
          onClickBalance={onClickBalance}
        >
          <div className="input-container-style xs:input-container-style xs:text-button">
            <input
              className="input-style xs:input-style xs:text-button"
              defaultValue={tap && inputValue ? inputValue : ""}
              placeholder={placeholder}
              onChange={onChange}
              ref={inputRef}
            />
          </div>
        </BalanceInputContainer>
        {showButton && (
          <BaseButton
            className="text-12 w-2/5 max-w-content mt-5 text-button xs:text-button"
            disabled={disabled}
            onClick={getInputValue}
          >
            {buttonLabel ?? title}
          </BaseButton>
        )}
      </div>
    </div >
  )
}
