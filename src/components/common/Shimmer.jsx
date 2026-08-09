
const Box = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
)

export const RestaurantListShimmer = ({ count = 8 }) => (
  <div className="flex flex-wrap justify-center">

    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="w-64 m-4 rounded-lg overflow-hidden border border-stone-200"
      >
        <Box className="h-40 w-full" />
        <div className="p-3 space-y-2">
          <Box className="h-4 w-3/4" />
          <Box className="h-3 w-1/2" />
        </div>
      </div>
    ))}
  </div>
)

export const MenuShimmer = () => (
  <div className="px-8 py-6 max-w-2xl mx-auto">
    <Box className="h-7 w-1/2 mb-3" />
    <Box className="h-4 w-1/3 mb-6" />
    {Array.from({ length: 5 }).map((_, index) => (
      <Box key={index} className="h-16 w-full mb-3" />
    ))}
  </div>
)