import classNames from "classnames";

export default function TabItem({ onClick, children, isActive }) {
  return (
    <div
      onClick={onClick}
      className={classNames(
        "px-2 py-2",
        "w-full",
        "text-center font-medium text-sm",
        "rounded-md place-self-center",
        "cursor-pointer",
        "transition-all duration-75",
        {
          " bg-dark-purple ": isActive,
          "hover:bg-purple text-gray-500 hover:text-gray-700": !isActive,
        }
      )}
    >
      {children}
    </div>
  );
}
