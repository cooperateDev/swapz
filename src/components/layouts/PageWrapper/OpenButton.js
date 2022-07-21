export default function OpenButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        -ml-0.5 -mt-0.5
        h-12 w-12
        inline-flex items-center justify-center rounded-full
        hover:bg-coolGray-200 active:bg-coolGray-300
        text-white hover:text-gray-700
        focus:outline-none
        `}
    >
      <span className="sr-only">Open sidebar</span>
      <svg
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
}
