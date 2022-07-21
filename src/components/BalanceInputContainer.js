/* eslint-disable jsx-a11y/anchor-is-valid */
export default function BalanceInputContainer({
  balanceStr,
  title,
  children,
  onClickBalance,
  className,
}) {
  return (
    <div className={`inline-block ${className}`}>
      <div>
        {title}
        <a onClick={onClickBalance} className="hover:underline group" href="#">
          <small className="inline-block float-right mt-1 text-coolGray-500 group-hover:underline cursor-pointer">
            Max:{" "}
            <span className="text-coolGray-800 font-medium ">{balanceStr}</span>
          </small>
        </a>
      </div>
      {children}
    </div>
  );
}
