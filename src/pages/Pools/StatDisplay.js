export default function StatDisplay({
  className,
  title,
  infoTooltip,
  content,
}) {
  return (
    <div className={`inline-block pl-4 text-white ${className}`}>
      <div className="text-sm flex">
        <div className="mr-1">{title}</div>
        {infoTooltip}
      </div>
      <div className="mt-2.5 text-xl font-medium text-default">{content}</div>
    </div>
  );
}
