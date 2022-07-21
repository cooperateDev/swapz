import { NERVE_BASE_URL } from "../../utils/urls";

import BaseButton from "../../components/BaseButton";

export default function LaunchAppButton() {
  return (
    <a href={NERVE_BASE_URL}>
      <BaseButton
        fancy={true}
        className="rounded-xl py-2 px-4 w-full hover:shadow-indigo-2xl opacity-90"
      >
        Launch App
      </BaseButton>
    </a>
  );
}
