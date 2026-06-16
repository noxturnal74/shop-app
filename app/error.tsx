'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#F2F2F7] dark:bg-[#000000] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1C1C1E] p-8 rounded-3xl max-w-md w-full text-center shadow-xl border border-gray-150 dark:border-gray-800 space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/20 text-red-500 flex items-center justify-center mx-auto">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Something went wrong!</h2>
        <p className="text-xs text-gray-500 leading-relaxed">
          An unexpected error occurred while processing your request. Please try reloading the page.
        </p>
        <button
          onClick={() => reset()}
          className="w-full bg-[#5856D6] hover:bg-[#4744C6] text-white font-bold py-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
        >
          <RefreshCw size={16} /> Try Again
        </button>
      </div>
    </div>
  )
}
