import { Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "../../hooks/useCart"

export default function Cart() {
  const { cartItems, removeEntry, clearCart, totalPrice } = useCart()

  return (
    <div className="px-8 py-6 max-w-2xl mx-auto">

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">My Cart</h1>


        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:text-red-600 font-medium cursor-pointer"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-3">Your cart is empty</p>
          <Link to="/" className="text-orange-500 font-medium hover:underline">
            Checkout Restaurants
          </Link>
        </div>
      ) : (
        <div className="flex flex-col">
          {cartItems.map((entry) => (
            <div
              key={entry.cartId}
              className="flex justify-between items-center py-4 border-b border-gray-200"
            >
              <div className="flex flex-col">
                <span className="font-medium">{entry.name}</span>
                <span className="text-gray-500 text-sm">₹{entry.price}</span>
              </div>

              <Trash2
                size={18}
                className="text-gray-400 hover:text-red-500 cursor-pointer"
                onClick={() => removeEntry(entry.cartId)}
              />
            </div>
          ))}

          <div className="flex justify-between items-center pt-4 font-semibold">
            <span>Total</span>
          
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
        </div>
      )}

    </div>
  )
}
