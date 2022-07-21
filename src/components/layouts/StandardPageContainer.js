export default function StandardPageContainer({ children }) {
  return (
    <main className="flex-1 relative z-0 overflow-y-auto h-full focus:outline-none text-white">
      <div className="2xl:w-3/4 items-center mt-4 sm:mt-6 mx-auto px-4 sm:px-8 md:px-12 py-8">
        {children}
      </div>
    </main>
  )
}
