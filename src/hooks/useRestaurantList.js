import { useEffect, useState } from "react"
import { fetchFromSwiggy } from "../utils/api"
import { parseRestaurantList } from "../utils/parsers"
import { SWIGGY_API_URL, STATUS } from "../utils/constants"





export const useRestaurantList = () => {
  const [restaurants, setRestaurants] = useState([])
  const [status, setStatus] = useState(STATUS.LOADING)

  useEffect(() => {


    const fetchRestaurants = async () => {
      setStatus(STATUS.LOADING)

      try {
        const json = await fetchFromSwiggy(SWIGGY_API_URL)
        setRestaurants(parseRestaurantList(json))
        setStatus(STATUS.DONE)
      } catch (error) {
        console.error("Restaurant list fetch failed:", error)
        setStatus(STATUS.ERROR)
      }
    }

    fetchRestaurants()
    
  }, [])

  return { restaurants, status }
}
