    // components/dashboard/dashboard-skeleton.tsx

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Skeleton className="h-8 w-8 rounded mr-2" />
              <Skeleton className="h-7 w-24 rounded" />
            </div>
            <div className="hidden md:flex space-x-8">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-5 w-16 rounded" />
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-28 rounded" />
              <Skeleton className="h-5 w-14 rounded" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <Skeleton className="h-9 w-72 rounded mb-2" />
          <Skeleton className="h-5 w-56 rounded" />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28 rounded" />
                  <Skeleton className="h-8 w-16 rounded" />
                </div>
                <Skeleton className="h-9 w-9 rounded-lg" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning card */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center mb-1">
                <Skeleton className="h-5 w-5 rounded mr-2" />
                <Skeleton className="h-6 w-40 rounded" />
              </div>
              <Skeleton className="h-4 w-48 rounded mb-6" />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-48 rounded" />
                      <div className="flex items-center space-x-3">
                        <Skeleton className="h-5 w-20 rounded-full" />
                        <Skeleton className="h-4 w-16 rounded" />
                      </div>
                      <Skeleton className="h-2 w-full rounded-full mt-2" />
                      <Skeleton className="h-3 w-20 rounded" />
                    </div>
                    <Skeleton className="h-8 w-20 rounded ml-4" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Practice card */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center mb-1">
                <Skeleton className="h-5 w-5 rounded mr-2" />
                <Skeleton className="h-6 w-32 rounded" />
              </div>
              <Skeleton className="h-4 w-52 rounded mb-6" />
              <div className="grid md:grid-cols-2 gap-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="p-4 border rounded-lg space-y-2">
                    <Skeleton className="h-5 w-28 rounded" />
                    <Skeleton className="h-4 w-44 rounded" />
                    <Skeleton className="h-5 w-12 rounded-full mt-3" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Streak card */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center mb-4">
                <Skeleton className="h-5 w-5 rounded mr-2" />
                <Skeleton className="h-6 w-32 rounded" />
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Skeleton className="h-10 w-12 rounded" />
                <Skeleton className="h-4 w-24 rounded" />
                <div className="flex space-x-1 mt-2">
                  {[...Array(7)].map((_, i) => (
                    <Skeleton key={i} className="w-6 h-6 rounded-full" />
                  ))}
                </div>
              </div>
            </div>

            {/* Achievements card */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center mb-4">
                <Skeleton className="h-5 w-5 rounded mr-2" />
                <Skeleton className="h-6 w-28 rounded" />
              </div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center p-3 rounded-lg bg-gray-50">
                    <Skeleton className="w-8 h-8 rounded-full mr-3 shrink-0" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-4 w-24 rounded" />
                      <Skeleton className="h-3 w-36 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions card */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <Skeleton className="h-6 w-28 rounded mb-4" />
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-9 w-full rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Reusable shimmer skeleton primitive
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 ${className}`}
      style={{
        background: "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
      }}
    />
  )
}

// Add to your global CSS (e.g. globals.css):
// @keyframes shimmer {
//   0%   { background-position: 200% 0; }
//   100% { background-position: -200% 0; }
// }