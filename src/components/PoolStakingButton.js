import { Link } from "react-router-dom";

import { ExternalLinkIcon } from "@heroicons/react/outline";

import BaseButton from "../components/BaseButton";

export default function PoolStakingButton({
  poolName,
  poolStakingLink,
  poolStakingLinkText,
}) {
  const btnContent = (
    <BaseButton
      className="px-4 !rounded-full mt-4 text-sm w-full transition duration-100"
      outline={true}
    >
      {poolStakingLinkText ?? `Stake ${poolName}`}
      <ExternalLinkIcon className="w-4 h-4 ml-2 inline group-hover:text-blue-500" />
    </BaseButton>
  );

  let result;
  if (poolStakingLink?.[0] === "/") {
    result = <Link to={poolStakingLink}>{btnContent}</Link>;
  } else {
    result = (
      <a href={poolStakingLink} target="_blank">
        {btnContent}
      </a>
    );
  }

  return result;
}
