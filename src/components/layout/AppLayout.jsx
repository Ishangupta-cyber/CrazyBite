import { useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"



export default function AppLayout() {
  const [searchText, setSearchText] = useState("")

  return (
    <>
      <Header searchText={searchText} setSearchText={setSearchText} />

      <Outlet context={{ searchText }} /> 

      <Footer />
    </>
  )
}
