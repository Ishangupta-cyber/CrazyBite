import { useContext } from "react"
import CartContext from "../utils/cartContext"


const makeCartId = () => `${Date.now()}-${Math.random()}`


export const useCart = () => {
  const { cartItems, setCartItems } = useContext(CartContext)
  

  const addItem = (item) => {
    setCartItems((prev) => [...prev, { ...item, cartId: makeCartId() }])
  }


  const removeOne = (itemId) => {
    setCartItems((prev) => {
      const index = prev.findIndex((entry) => entry.id === itemId)
      if (index === -1) return prev

      return [...prev.slice(0, index), ...prev.slice(index + 1)]
    })
  }


  const removeEntry = (cartId) => {
    setCartItems((prev) => prev.filter((entry) => entry.cartId !== cartId))
  }

  const clearCart = () => setCartItems([])

  /** Ek dish cart mein kitni baar hai*/
  const getItemCount = (itemId) =>
    cartItems.filter((entry) => entry.id === itemId).length

  const totalPrice = cartItems.reduce((sum, entry) => sum + entry.price, 0)

  return {
    cartItems,
    addItem,
    removeOne,
    removeEntry,
    clearCart,
    getItemCount,
    totalPrice,
  }
}
