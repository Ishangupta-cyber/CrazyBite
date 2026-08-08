import React from "react"
import RestaurantCard from "./RestaurantCard"
import { resList } from "../utils/mockData"
import { useOutletContext } from "react-router-dom"

const Body = () => {
  
  const {searchText}=useOutletContext()

  const filteredList=resList.filter((data)=>{
    return(
      data.name.toLowerCase().includes(searchText?.toLowerCase())
    )
  })


  return (
    <div className="px-8 py-6">
      <h2 className="text-xl font-bold mb-4">Restaurants near you</h2>

      <div className="flex flex-wrap justify-center">
        {filteredList.map((data) => (
          <RestaurantCard data={data} key={data.id} />
        ))}
      </div>
    </div>
  )
}

export default Body