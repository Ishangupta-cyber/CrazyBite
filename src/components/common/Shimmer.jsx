import { RESTAURANT_GRID } from "../../utils/styles"


const Box = ({ className }) => (
  <div className={`animate-pulse rounded-lg bg-surface-2 ${className}`} />
)


// shimmer ka shape asli card se match karta hai, warna load hote hi layout kudta hai
export const RestaurantListShimmer = ({ count = 8 }) => (
  <div className={RESTAURANT_GRID}>
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="overflow-hidden rounded-2xl border border-line bg-surface"
      >
        <Box className="aspect-4/3 w-full rounded-none" />

        <div className="space-y-2.5 p-3.5">
          <div className="flex items-center justify-between gap-2">
            <Box className="h-4 w-2/3" />
            <Box className="h-4 w-9" />
          </div>

          <Box className="h-3 w-1/2" />
          <Box className="h-3 w-3/5" />
        </div>
      </div>
    ))}
  </div>
)


export const MenuShimmer = () => (
  <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
    <div className="mb-6 rounded-2xl border border-line bg-surface p-5">
      <Box className="mb-3 h-7 w-1/2" />
      <Box className="mb-4 h-4 w-1/3" />

      <div className="flex gap-3">
        <Box className="h-12 w-24" />
        <Box className="h-12 w-24" />
        <Box className="h-12 w-24" />
      </div>
    </div>

    {Array.from({ length: 5 }).map((_, index) => (
      <div
        key={index}
        className="mb-3 flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-4"
      >
        <div className="flex-1 space-y-2">
          <Box className="h-4 w-2/5" />
          <Box className="h-3 w-1/4" />
          <Box className="h-3 w-3/4" />
        </div>

        <Box className="h-24 w-28 shrink-0" />
      </div>
    ))}
  </div>
)


export const CartShimmer = () => (
  <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
    <Box className="mb-6 h-8 w-40" />

    {Array.from({ length: 3 }).map((_, index) => (
      <div
        key={index}
        className="mb-3 flex items-center gap-4 rounded-2xl border border-line bg-surface p-4"
      >
        <Box className="h-14 w-14 shrink-0 rounded-xl" />

        <div className="flex-1 space-y-2">
          <Box className="h-4 w-1/3" />
          <Box className="h-3 w-16" />
        </div>
      </div>
    ))}
  </div>
)
