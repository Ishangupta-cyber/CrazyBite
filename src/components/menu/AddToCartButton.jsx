import { Plus, Minus } from "lucide-react"
import { useCart } from "../../hooks/useCart"


const AddToCartButton = ({ item }) => {
  const { addItem, removeOne, getItemCount } = useCart()

  const count = getItemCount(item.id)


  if (count === 0) {
    return (
      <button
        className="bg-white border border-orange-400 text-orange-500 font-medium px-5 py-1.5 rounded-lg text-sm hover:bg-orange-50 cursor-pointer"
        onClick={() => addItem(item)}
      >
        ADD
      </button>
    )
  }

  return (
    <div className="flex items-center gap-3 border border-orange-400 rounded-lg px-2 py-1">
      <Minus
        size={16}
        className="cursor-pointer text-orange-500"
        onClick={() => removeOne(item.id)}
      />
      <span className="text-sm font-medium">{count}</span>
      <Plus
        size={16}
        className="cursor-pointer text-orange-500"
        onClick={() => addItem(item)}
      />
    </div>
  )
}

export default AddToCartButton
