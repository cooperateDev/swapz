import LaunchAppButton from "./LaunchAppButton";
import TradeNrvButton from "./TradeNrvButton";

export default function HomeActionLauncher() {
  return (
    <div className="space-x-4">
      <div className="inline-block">
        <TradeNrvButton />
      </div>
      <div className="inline-block">
        <LaunchAppButton />
      </div>
    </div>
  );
}
