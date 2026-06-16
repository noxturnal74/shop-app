import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F2F2F7] dark:bg-[#000000] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1C1C1E] p-8 rounded-3xl max-w-md w-full text-center shadow-xl border border-gray-155 dark:border-gray-800 space-y-5">
        <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/20 text-[#007AFF] flex items-center justify-center mx-auto">
          <AlertCircle size={32} />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Page Not Found</h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            The link you followed may be broken, or the page may have been removed.
          </p>
        </div>
        <Link
          href="/"
          className="w-full bg-[#5856D6] hover:bg-[#4744C6] text-white font-bold py-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center active:scale-95"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
