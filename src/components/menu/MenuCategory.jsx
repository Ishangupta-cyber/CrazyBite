import { ChevronDown } from "lucide-react"
import MenuItem from "./MenuItem"



const MenuCategory = ({ category, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200">

      <button
        className="w-full flex justify-between items-center py-4 cursor-pointer text-left"
        onClick={onToggle}
      >
        <span className="font-semibold">
          {category.title} ({category.items.length})
        </span>

        <ChevronDown
          size={18}
          className={`text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

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