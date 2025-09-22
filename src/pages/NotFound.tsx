import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import { pageStyles } from '../utils/theme'

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className={`max-w-md w-full ${pageStyles.centeredContent}`}>
        <h1 className="text-9xl font-bold text-gray-300 dark:text-gray-700 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className={pageStyles.primaryButtonInline}
        >
          <Home size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound