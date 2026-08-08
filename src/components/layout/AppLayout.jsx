import { useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import CartContext from "../../utils/cartContext"

/**
 * Poore app ka dhaancha: Header upar, Footer neeche, aur beech mein
 * <Outlet /> — yahan router current page (Body / RestaurantMenu / Cart) daalta hai.
 *
 * Cart state yahan rehta hai (page ke andar nahi) kyunki page badalne pe bhi
 * cart nahi udna chahiye. AppLayout kabhi unmount nahi hota, isliye state safe hai.
 */
export default function AppLayout() {
  const [searchText, setSearchText] = useState("")
  const [cartItems, setCartItems] = useState([])

  return (
    // Provider ke andar ke SAARE components cart access kar sakte hain
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      <Header searchText={searchText} setSearchText={setSearchText} />

      {/* context prop se child route ko search text milta hai (useOutletContext) */}
      <Outlet context={{ searchText }} />

      <Footer />
    </CartContext.Provider>
  )
}
