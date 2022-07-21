import Tooltip from "../components/tailwind/Tooltip";

import { ExternalLinkIcon } from "@heroicons/react/outline";

export default function CustomTooltip() {
  return (
    <div className="flex">
      <div className="w-full text-center">
        <Tooltip
          title=""
          content={
            <div>
              <div className=" font-medium mb-0 rounded-t-lg">
                nrvRUSD earns $RAMP. Visit Ramp here to stake nrvRUSD.
              </div>
            </div>
          }
        >
          <a
            href="https://appv2.rampdefi.com"
            target="_blank"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLinkIcon className="w-4 h-4 inline mx-1 -mt-0.5 text-gray-400 hover:text-blue-600" />
          </a>
        </Tooltip>
      </div>
    </div>
  );
}
