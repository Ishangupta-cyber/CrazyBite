import { useParams } from "react-router-dom"
import { resList } from "../utils/mockData"
import CartContext from "../utils/cartContext"
import { useContext } from "react"
import { Plus, Minus } from "lucide-react"

const RestaurantMenu = () => {

  const { resId } = useParams()
  const restaurant = resList.find((res) => res.id == resId)
  
  const { cartItems, setCartItems } = useContext(CartContext)

  function handleAddItem(item) {
  const cartEntry = { ...item, cartId: Date.now() }
  setCartItems([...cartItems, cartEntry])
}

  function handleRemoveItem(itemId) {
    const index = cartItems.findIndex((ci) => ci.id === itemId)
    if (index === -1) return
    const updatedCart = [
      ...cartItems.slice(0, index),
      ...cartItems.slice(index + 1),
    ]
    setCartItems(updatedCart)
  }

  function getItemCount(itemId) {
    return cartItems.filter((ci) => ci.id === itemId).length
  }

  return (
    <div className="px-8 py-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">{restaurant.name}</h1>
      <p className="text-gray-500 mb-1">{restaurant.cuisine}</p>
      <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
        <span>⭐ {restaurant.rating}</span>
        <span>{restaurant.deliveryTime}</span>
      </div>

      <div className="border-t border-gray-300 my-3"></div>

      <h2 className="text-lg font-semibold mb-3">Menu</h2>

      <div className="flex flex-col">
        {restaurant.menuItems.map((item) => {
          const count = getItemCount(item.id)

          return (
            <div
              key={item.id}
              className="flex justify-between items-center py-4 border-b border-gray-200"
            >
              <div className="flex flex-col">
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-500 text-sm">₹{item.price}</span>
              </div>

              {count === 0 ? (
                <button
                  className="bg-white border border-orange-400 text-orange-500 font-medium px-5 py-1.5 rounded-lg text-sm hover:bg-orange-50 cursor-pointer"
                  onClick={() => handleAddItem(item)}
                >
                  ADD
                </button>
              ) : (
                <div className="flex items-center gap-3 border border-orange-400 rounded-lg px-2 py-1">
                  <Minus
                    size={16}
                    className="cursor-pointer text-orange-500"
                    onClick={() => handleRemoveItem(item.id)}
                  />
                  <span className="text-sm font-medium">{count}</span>
                  <Plus
                    size={16}
                    className="cursor-pointer text-orange-500"
                    onClick={() => handleAddItem(item)}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RestaurantMenu