import { createContext } from "react"

// Context = ek "global box" jisme data rakh do, aur koi bhi component
// use seedha nikaal le — beech ke components se props pass karne ki zaroorat nahi.
//
// Cart yahan isliye hai kyunki isko 3 alag-alag jagah chahiye:
// Header (count), RestaurantMenu (add karne ke liye), Cart page (dikhane ke liye).
//
// Actual value AppLayout deta hai (Provider), aur components useCart() hook
// se ise padhte hain — seedha useContext kahin nahi likha jaata.
const CartContext = createContext(null)

export default CartContext
