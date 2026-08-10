import { useState } from "react"
import { useParams, useOutletContext, Link } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import RestaurantInfo from "./RestaurantInfo"
import MenuCategory from "./MenuCategory"
import { MenuShimmer } from "../common/Shimmer"
import ErrorMessage from "../common/ErrorMessage"
import { useRestaurantMenu } from "../../hooks/useRestaurantMenu"
import { STATUS } from "../../utils/constants"


const RestaurantMenu = () => {
  const { resId } = useParams()
  const { coords } = useOutletContext()

  const { restaurant, categories, status } = useRestaurantMenu(resId, coords)

  const [openIndex, setOpenIndex] = useState(0)

  if (status === STATUS.LOADING) return <MenuShimmer />

  if (status === STATUS.ERROR) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <ErrorMessage message="Menu load nahi ho paaya. Thodi der baad try karo." />
      </div>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">

      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-accent"
      >
        <ChevronLeft size={16} />
        All restaurants
      </Link>

      <RestaurantInfo restaurant={restaurant} />

      <h2 className="mt-8 mb-4 text-center text-xs font-bold tracking-[0.2em] text-muted uppercase">
        — Menu —
      </h2>

      <div className="flex flex-col gap-3">
        {categories.map((category, index) => (
          <MenuCategory
            key={category.title + index}
            category={category}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
          />
        ))}
      </div>
    </main>
  )
}

export default RestaurantMenu
