import { useEffect, useState } from "react"
import { fetchFromSwiggy } from "../utils/api"
import { parseRestaurantList } from "../utils/parsers"
import {  STATUS, getSwiggyApiUrl } from "../utils/constants"
import { useGeolocation } from "./useGeolocation"


export const useRestaurantList = (coords) => {
  const [restaurants, setRestaurants] = useState([])
  const [status, setStatus] = useState(STATUS.LOADING)

  useEffect(() => {
    if (!coords) return 

    const fetchRestaurants = async () => {
      setStatus(STATUS.LOADING)

      try {
        const json = await fetchFromSwiggy(getSwiggyApiUrl(coords.lat, coords.lng))
        setRestaurants(parseRestaurantList(json))
        setStatus(STATUS.DONE)
      } catch (error) {
        console.error("Restaurant list fetch failed:", error)
        setStatus(STATUS.ERROR)
      }
    }

    fetchRestaurants()
    
  }, [coords])

  return { restaurants, status }
}
