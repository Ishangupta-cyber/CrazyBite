import React, { useState } from 'react'
import Header from './Header'
import {Outlet} from "react-router-dom"
import Footer from './Footer'

export default function AppLayout() {
  const [searchText,setSearchText]=useState("")
  return (
    <div>

      <Header searchText={ searchText} setSearchText={setSearchText}/>
      <Outlet context={{searchText}}/>
      <Footer/>


    </div>
  )
}
