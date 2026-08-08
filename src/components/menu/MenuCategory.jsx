import { ChevronDown } from "lucide-react"
import MenuItem from "./MenuItem"

/**
 * Ek collapsible category (accordion section) — jaise "Recommended (20)".
 *
 * Yahan ek zaroori design decision hai: `isOpen` state IS component ke andar nahi hai,
 * parent (RestaurantMenu) ke paas hai. Kyunki ek waqt pe sirf EK category khuli
 * rehni chahiye — aur ye "sirf ek" waali baat sirf parent hi jaanta hai,
 * kyunki wahi saari categories ko dekh raha hai.
 *
 * Isko "lifting state up" kehte hain: jo state do bhaiyon ko affect kare,
 * wo unke parent ke paas rakho.
 */
const MenuCategory = ({ category, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200">

      {/* Header — click karo to khulta/band hota hai */}
      <button
        className="w-full flex justify-between items-center py-4 cursor-pointer text-left"
        onClick={onToggle}
      >
        <span className="font-semibold">
          {category.title} ({category.items.length})
        </span>

        {/* Khulne par arrow 180° ghoom jaata hai */}
        <ChevronDown
          size={18}
          className={`text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Band hai to items render hi nahi hote — page halka rehta hai */}
      {isOpen && (
        <div className="flex flex-col pb-2">
          {category.items.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      )}

    </div>
  )
}

export default MenuCategory