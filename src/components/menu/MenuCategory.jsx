import { ChevronDown } from "lucide-react"
import MenuItem from "./MenuItem"



const MenuCategory = ({ category, isOpen, onToggle }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">

      <button
        className="flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-surface-2"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="min-w-0 truncate font-bold text-fg">
          {category.title}
        </span>

        <span className="flex shrink-0 items-center gap-2.5">
          <span className="rounded-md bg-surface-2 px-1.5 py-0.5 text-xs font-semibold text-muted">
            {category.items.length}
          </span>

          <ChevronDown
            size={18}
            className={`text-muted transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      {isOpen && (
        <div className="divide-y divide-line border-t border-line">
          {category.items.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MenuCategory
