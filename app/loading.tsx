export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F2F2F7] dark:bg-[#000000] p-4 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Skeleton */}
        <div className="h-16 bg-white dark:bg-[#1C1C1E] rounded-2xl animate-pulse" />
        
        {/* Hero Banner Skeleton */}
        <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-3xl animate-pulse" />

        {/* Categories Skeleton */}
        <div className="flex gap-3 overflow-x-auto">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="w-20 h-10 bg-white dark:bg-[#1C1C1E] rounded-full animate-pulse flex-shrink-0" />
          ))}
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white dark:bg-[#1C1C1E] rounded-3xl h-80 animate-pulse border border-gray-100 dark:border-gray-800" />
          ))}
        </div>
      </div>
    </div>
  )
}
