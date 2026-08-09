import { useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import CartContext from "../../utils/cartContext"



export default function AppLayout() {
  const [searchText, setSearchText] = useState("")
  const [cartItems, setCartItems] = useState([])

  return (

    <CartContext.Provider value={{ cartItems, setCartItems }}>
      <Header searchText={searchText} setSearchText={setSearchText} />

      <Outlet context={{ searchText }} /> 

      <Footer />
    </CartContext.Provider>
  )
}
