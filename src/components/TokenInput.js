import { SWAPABLE_TOKENS_MAP } from "../constants"
import InteractiveInputRow from "../components/InteractiveInputRow"

function TokenInput({ symbol, icon, max, tokenRef, onChange, tap = null }) {
  let balanceStr = "0.0"
  console.log(tap)
  function onChangeInput(e) {
    // const re = /^[0-9\b]+$/;
    // if (e.target.value === '' || re.test(e.target.value)) {
    //   this.setState({ value: e.target.value })
    // }
    const { decimals } = SWAPABLE_TOKENS_MAP[symbol]
    const parsedValue = parseFloat("0" + e.target.value)
    const periodIndex = e.target.value.indexOf(".")
    const isValidInput = e.target.value === "" || !isNaN(parsedValue)
    const isValidPrecision =
      periodIndex === -1 || e.target.value.length - 1 - periodIndex <= decimals
    if (isValidInput && isValidPrecision) {
      // don't allow input longer than the token allows
      onChange(e.target.value)
    }
  }

  return (
    <div className=" items-center">
      <div className="w-full">
        <InteractiveInputRow
          title={symbol}
          balanceStr={balanceStr}
          placeholder={"0.0"}
          showButton={false}
          icon={icon}
          inputRef={tokenRef}
          onChange={onChangeInput}
          tap={tap}
        />
      </div>
    </div>
  )
}

export default TokenInput
