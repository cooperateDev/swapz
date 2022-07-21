import { ExternalLinkIcon } from "@heroicons/react/outline"
import METAMASK_ICON from "../assets/icons/metamask.svg"

export default function ExternalLinkButton({ className, text, href }) {
  return (
    <>
      <a href={href} target="_blank" className="float-right">
        <button
          className={`px-2 group border-gray-50 hover:border-gray-200 active:border-gray-300 rounded-full focus:ring-0 active:ring-0 focus:outline-none transform-gpu transition duration-500 ease-in-out ${className}`}
        >
          <div className="-mt-1">
            <small className="text-gray-500 group-focus:text-gray-600 hidden group-hover:inline-block transition duration-500 ease-in-out">
              {text}
            </small>
            <div className="inline-block px-1 self-center -top-1">
              <ExternalLinkIcon className="h-4 w-4 inline self-center text-gray-500 group-focus:text-gray-600 group-hover:text-blue-600" />
            </div>
          </div>
        </button>
      </a>
      <button
        className={`px-2 group border-gray-50 hover:border-gray-200 active:border-gray-300 rounded-full focus:ring-0 active:ring-0 outline-none transform-gpu transition duration-500 ease-in-out`}
      >
        <img src={METAMASK_ICON} className="h-6 w-6 inline" />
      </button>
    </>
  )
}
