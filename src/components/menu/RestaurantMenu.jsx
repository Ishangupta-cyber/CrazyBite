import { useState } from "react"
import { useParams } from "react-router-dom"
import RestaurantInfo from "./RestaurantInfo"
import MenuCategory from "./MenuCategory"
import { MenuShimmer } from "../common/Shimmer"
import ErrorMessage from "../common/ErrorMessage"
import { useRestaurantMenu } from "../../hooks/useRestaurantMenu"
import { STATUS } from "../../utils/constants"

/**
 * MENU PAGE.
 *
 * Ye ab sirf "manager" hai — kaam khud nahi karta, baant deta hai:
 *   - data laana        → useRestaurantMenu hook
 *   - header dikhana    → RestaurantInfo
 *   - category dikhana  → MenuCategory → MenuItem → AddToCartButton
 *
 * Iske paas apna sirf ek kaam bacha hai: kaunsi category khuli hai, ye yaad rakhna.
 */
const RestaurantMenu = () => {
  // URL se id: /restaurant/442422 → resId = "442422"
  // (App.jsx mein path ":resId" likha hai, isliye naam resId hai)
  const { resId } = useParams()

  const { restaurant, categories, status } = useRestaurantMenu(resId)

  // Kaunsi category khuli hai. 0 = pehli wali khuli rakho.
  // -1 = koi bhi nahi (jab user khuli hui pe dobara click kare)
  const [openIndex, setOpenIndex] = useState(0)

  if (status === STATUS.LOADING) return <MenuShimmer />

  if (status === STATUS.ERROR) {
    return (
      <div className="px-8 py-6 max-w-2xl mx-auto">
        <ErrorMessage message="Menu load nahi ho paaya. Thodi der baad try karo." />
      </div>
    )
  }

  return (
    <div className="px-8 py-6 max-w-2xl mx-auto">
      <RestaurantInfo restaurant={restaurant} />

      <div className="border-t border-gray-300 my-3"></div>

      <h2 className="text-lg font-semibold mb-3">Menu</h2>

      <div className="flex flex-col gap-2">
        {categories.map((category, index) => (
          <MenuCategory
            // title kabhi-kabhi repeat ho sakta hai, isliye index bhi joda
            key={category.title + index}
            category={category}
            isOpen={openIndex === index}
            // Khuli hui pe click → band karo (-1), warna usko kholo
            onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
          />
        ))}
      </div>
    </div>
  )
}

export default RestaurantMenu
