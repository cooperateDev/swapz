import { useState, createRef } from "react"
import { createPopper } from "@popperjs/core"
import classNames from "classnames"

export default function Tooltip({ children, title, content, className }) {
  const [tooltipShow, setTooltipShow] = useState(false)
  const btnRef = createRef()
  const tooltipRef = createRef()
  const openLeftTooltip = () => {
    createPopper(btnRef.current, tooltipRef.current, {
      placement: "bottom",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [-150, -100],
          },
        },
      ],
    })
    setTooltipShow(true)
  }
  const closeLeftTooltip = () => {
    setTooltipShow(false)
  }

  return (
    <>
      <div
        onMouseEnter={openLeftTooltip}
        onMouseLeave={closeLeftTooltip}
        ref={btnRef}
        className={`inline-block ${className}`}
      >
        {children}
      </div>
      <div
        className={classNames(
          "bg-dark-purple opacity-90 border-0 mt-3 z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg",
          {
            hidden: !tooltipShow,
            block: tooltipShow,
          }
        )}
        ref={tooltipRef}
      >
        <div>
          {title && (
            <div className="text-gray-50 opacity-75 font-semibold py-2 px-3 mb-0 border-b border-solid border-blueGray-600 rounded-t-lg">
              {title}
            </div>
          )}
          <div className="text-gray-50 p-3">{content}</div>
        </div>
      </div>
    </>
  )
}
