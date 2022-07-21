const baseClassname = `
  text-white
  px-2 py-2
  transition-all duration-75
  focus:outline-none
  group h-12
  `
const fancyBgClassname = `
  bg-gradient-to-br from-dark-purple to-light-purple
  hover:from-purple-700 hover:to-blue-700
  active:from-purple-800 active:to-blue-800
  disabled:from-coolGray-300 disabled:to-coolGray-200
  `

const bgClassname = `bg-btn-purple rounded-md hover:bg-indigo-800 active:bg-indigo-900 disabled:bg-coolGray-300`

const outlineClassname = `
  text-white bg-transparent active:bg-gray-50 disabled:bg-coolGray-300
  border border-gray-200 hover:border-gray-500 active:border-blue-500
  hover:text-gray-600
  `

const connectBtn = `connect-btn`

export default function BaseButton({
  className,
  children,
  fancy,
  swap,
  outline,
  ...props
}) {
  let btnStyleClassname
  if (fancy) {
    btnStyleClassname = fancyBgClassname
  } else if (outline) {
    btnStyleClassname = outlineClassname
  } else if (swap) {
    btnStyleClassname = connectBtn
  } else {
    btnStyleClassname = bgClassname
  }
  console.log(props)
  return (
    <button
      className={`${baseClassname} ${btnStyleClassname} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
