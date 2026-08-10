import { useEffect, useState } from "react"
import { fetchFromSwiggy } from "../utils/api"
import { parseRestaurantInfo, parseMenuCategories } from "../utils/parsers"
import { SWIGGY_MENU_URL, STATUS } from "../utils/constants"



export const useRestaurantMenu = (resId, coords) => {
  const [restaurant, setRestaurant] = useState(null)
  const [categories, setCategories] = useState([])
  const [status, setStatus] = useState(STATUS.LOADING)

  useEffect(() => {

  
    if (!coords) return

    let ignore = false

    const fetchMenu = async () => {
      setStatus(STATUS.LOADING)

      try {
        const json = await fetchFromSwiggy(SWIGGY_MENU_URL(resId, coords.lat, coords.lng))
        if (ignore) return

        const info = parseRestaurantInfo(json)

        if (!info) {
          setStatus(STATUS.ERROR)
          return
        }

        setRestaurant(info)
        setCategories(parseMenuCategories(json))
        setStatus(STATUS.DONE)
      } catch (error) {
        if (ignore) return
        console.error("Menu fetch failed:", error)
        setStatus(STATUS.ERROR)
      }
    }

    fetchMenu()

    return () => {
      ignore = true
    }

  }, [resId, coords])

  return { restaurant, categories, status }
}