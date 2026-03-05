export default function NuevaSolicitudRRHHLoading() {
  return (
    <div className="container mx-auto py-6">
      {/* Header skeleton */}
      <div className="flex items-center mb-6">
        <div className="h-6 bg-gray-200 rounded w-16 mr-4 animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
      </div>

      {/* Form skeleton */}
      <div className="space-y-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mb-6 animate-pulse"></div>

          <div className="space-y-6">
            {/* Form fields skeleton */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Documentation skeleton */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
          <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Buttons skeleton */}
        <div className="flex justify-end space-x-4">
          <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
