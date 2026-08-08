import { useContext } from "react"
import CartContext from "../utils/cartContext"

// Har cart entry ko ek unique id chahiye, kyunki ek hi dish do baar add ho sakti hai
// aur delete karte waqt hume pata hona chahiye KAUNSI wali hatani hai.
// Date.now() akela kaafi nahi — do fast clicks same millisecond mein ho sakte hain.
const makeCartId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`

/**
 * CUSTOM HOOK: cart ke saare kaam ek jagah.
 *
 * Pehle ye logic Cart.jsx aur RestaurantMenu.jsx dono mein alag-alag likha tha —
 * yaani ek hi cheez do jagah. Ab dono yahi hook use karte hain.
 *
 * Ye setCartItems ko bahar expose nahi karta — components ko sirf
 * "add karo / hatao / count do" chahiye, raw state ko chhedne ki zaroorat nahi.
 */
export const useCart = () => {
  const { cartItems, setCartItems } = useContext(CartContext)

  /** Cart mein ek item add karo (same dish dobara bhi add ho sakti hai) */
  const addItem = (item) => {
    setCartItems((prev) => [...prev, { ...item, cartId: makeCartId() }])
  }

  /** Us dish ki sirf EK copy hatao (quantity minus karne ke liye) */
  const removeOne = (itemId) => {
    setCartItems((prev) => {
      const index = prev.findIndex((entry) => entry.id === itemId)
      if (index === -1) return prev

      // Sirf ek entry nikaalna hai, isliye filter nahi chalega
      // (filter to saari matching hata deta) — index se slice karke jodte hain
      return [...prev.slice(0, index), ...prev.slice(index + 1)]
    })
  }

  /** Cart page se poori entry hatao (cartId se — dish id se nahi) */
  const removeEntry = (cartId) => {
    setCartItems((prev) => prev.filter((entry) => entry.cartId !== cartId))
  }

  const clearCart = () => setCartItems([])

  /** Ek dish cart mein kitni baar hai — MenuItem ka counter isi se chalta hai */
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
