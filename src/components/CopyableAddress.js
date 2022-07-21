import CopyIcon from "../components/icons/CopyIcon"

export default function CopyableAddress({ address, className }) {
  return (
    <div
      className={` text-sm text-white focus-within:text-blue-500 mb-2 -ml-1 py-0.5 px-1 border border-transparent hover:border-gray-200 rounded-full flex-shrink group break-all ${className}`}
      onClick={() => writeToClipboard(address)}
    >
      {address}
      <CopyIcon className="h-5 w-5 inline-block group-hover:text-blue-500 active:text-blue-600 -mt-1 " />
    </div>
  )
}

async function writeToClipboard(contentText) {
  try {
    await navigator.clipboard.writeText(contentText)
  } catch (err) {
    console.error("Failed to copy!", err)
  }
}
