export default function Loading() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className="w-full flex space-x-2">
              <div className="flex-1 h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex-1 h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex-1 h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>
            ))}
            <div className="flex justify-between pt-4">
              <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
