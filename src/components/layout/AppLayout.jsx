import { useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"



export default function AppLayout() {
  const [searchText, setSearchText] = useState("")

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Header searchText={searchText} setSearchText={setSearchText} />

      {/* flex-1 taaki chhote pages pe bhi footer neeche hi chipka rahe */}
      <div className="flex-1">
        <Outlet context={{ searchText }} />
      </div>

      <Footer />
    </div>
  )
}
