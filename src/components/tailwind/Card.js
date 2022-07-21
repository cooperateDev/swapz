export default function Card({
  title,
  className,
  children,
  titleClassName,
  divider = true,
  btn,
  ...props
}) {
  let content = (
    <div
      className={`bg-dark-blue shadow-lg pt-3 px-6 pb-6 rounded-lg ${className ?? ""
        }`}
    >
      {children}
    </div>
  )
  if (title) {
    content = (
      <>
        <div
          className={`bg-dark-blue shadow-lg pt-3 px-6 pb-6 rounded-lg ${className ?? ""
            }`}
        >
          {btn}
          <div
            className={
              "font-medium text-xl mt-6 mb-6" +
              titleClassName
            }
          >
            {title}
          </div>
          {divider ? <hr /> : ""}
          {children}
        </div>
      </>
    )
  }

  if (title && title === "Swap") {
    content = (
      <>
        <div className={`pt-3 px-6 pb-6 rounded-lg ${className ?? ""}`}>
          {btn}
          <div
            className={
              "font-medium text-xl mt-6 mb-6 flex justify-between " +
              titleClassName
            }
          >
            {title}
          </div>
          {divider ? <hr /> : ""}
          {children}
        </div>
      </>
    )
  }

  return <>{content}</>
}
