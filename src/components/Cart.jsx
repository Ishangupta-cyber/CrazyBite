import React, { useContext } from 'react'
import CartContext from '../utils/cartContext'
import { Trash2 } from 'lucide-react'

export default function Cart() {
  const { cartItems, setCartItems } = useContext(CartContext)

  function handleClearCart() {
    setCartItems([])
  }

  function handleRemoveItem(id) {
    const filteredItems=cartItems.filter((item)=>(
      item.cartId!=id
    ))
    setCartItems(filteredItems)
  }

  return (
    <div className="px-8 py-6 max-w-2xl mx-auto">
      
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">My Cart</h1>
        <button
          onClick={handleClearCart}
          className="text-sm text-red-500 hover:text-red-600 font-medium cursor-pointer"
        >
          Clear Cart
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center py-10">Your cart is empty</p>
      ) : (
        <div className="flex flex-col">
          {cartItems.map((item, index) => (
            <div
              key={item.cartId}
              className="flex justify-between items-center py-4 border-b border-gray-200"
            >
              <div className="flex flex-col">
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-500 text-sm">₹{item.price}</span>
              </div>

              <Trash2
                size={18}
                className="text-gray-400 hover:text-red-500 cursor-pointer"
                onClick={() => handleRemoveItem(item.cartId)}
              />
            </div>
          ))}

          <div className="flex justify-between items-center pt-4 font-semibold">
            <span>Total</span>
            <span>₹{cartItems.reduce((prev,curr)=>{
              prev+=curr.price
              return prev
            },0)}</span>
          </div>
        </div>
      )}

    </div>
  )
}