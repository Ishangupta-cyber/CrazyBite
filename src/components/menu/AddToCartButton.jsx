import { Plus, Minus } from "lucide-react"
import { useCart } from "../../hooks/useCart"


const AddToCartButton = ({ item }) => {
  const { addItem, removeOne, getItemCount } = useCart()

  const count = getItemCount(item.id)


  if (count === 0) {
    return (
      <button
        className="cursor-pointer rounded-xl border border-line bg-surface px-6 py-1.5 text-sm font-bold tracking-wide text-accent shadow-card transition-all hover:border-accent hover:bg-accent-soft active:scale-95"
        onClick={() => addItem(item)}
      >
        ADD
      </button>
    )
  }

  return (
    <div className="flex items-center gap-1 rounded-xl border border-accent bg-surface shadow-card">
      <button
        onClick={() => removeOne(item.id)}
        aria-label={`Remove one ${item.name}`}
        className="cursor-pointer rounded-l-xl px-2.5 py-2 text-accent transition-colors hover:bg-accent-soft active:scale-95"
      >
        <Minus size={14} />
      </button>

      <span className="min-w-5 text-center text-sm font-bold text-accent tabular-nums">
        {count}
      </span>

      <button
        onClick={() => addItem(item)}
        aria-label={`Add one more ${item.name}`}
        className="cursor-pointer rounded-r-xl px-2.5 py-2 text-accent transition-colors hover:bg-accent-soft active:scale-95"
      >
        <Plus size={14} />
      </button>
    </div>
  )
}

export default AddToCartButton
