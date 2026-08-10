import { Star } from "lucide-react"
import AddToCartButton from "./AddToCartButton"


// Swiggy wala square veg/non-veg marker
const VegBadge = ({ isVeg }) => (
  <span
    className={`grid h-3.5 w-3.5 shrink-0 place-items-center rounded-[3px] border ${
      isVeg ? "border-veg" : "border-nonveg"
    }`}
    title={isVeg ? "Veg" : "Non-veg"}
  >
    <span
      className={`h-1.5 w-1.5 rounded-full ${
        isVeg ? "bg-veg" : "bg-nonveg"
      }`}
    />
  </span>
)


const MenuItem = ({ item }) => {
  return (
    <div className="flex items-start justify-between gap-4 p-5 pb-7">

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mb-1.5 flex items-center gap-2">
          <VegBadge isVeg={item.isVeg} />

          {item.rating && (
            <span className="flex items-center gap-0.5 text-[11px] font-bold text-veg">
              <Star size={9} className="fill-current" />
              {item.rating}
            </span>
          )}
        </div>

        <h4 className="font-semibold text-fg">{item.name}</h4>

        <span className="mt-0.5 text-sm font-medium text-muted">
          ₹{item.price}
        </span>

        {item.description && (
          <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted/80">
            {item.description}
          </p>
        )}
      </div>

      <div className="relative w-28 shrink-0">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="h-24 w-28 rounded-xl object-cover"
          />
        ) : (
          <div className="h-24 w-28 rounded-xl border border-dashed border-line bg-surface-2" />
        )}

        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
          <AddToCartButton item={item} />
        </div>
      </div>
    </div>
  )
}

export default MenuItem
