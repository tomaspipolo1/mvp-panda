export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 bg-gray-200 rounded w-64 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-40 animate-pulse"></div>
            </div>
            <div>
              <div className="h-10 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="h-8 bg-gray-200 w-full animate-pulse mb-4"></div>
          <div className="h-16 bg-gray-200 w-full animate-pulse mb-2"></div>
          <div className="h-16 bg-gray-200 w-full animate-pulse mb-2"></div>
          <div className="h-16 bg-gray-200 w-full animate-pulse mb-2"></div>
          <div className="h-16 bg-gray-200 w-full animate-pulse"></div>
        </div>

        <div className="px-6 py-4 flex items-center justify-between">
          <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
          <div className="flex space-x-2">
            <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
