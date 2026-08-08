import { useEffect, useState } from "react"
import { fetchFromSwiggy } from "../utils/api"
import { parseRestaurantList } from "../utils/parsers"
import { SWIGGY_API_URL, STATUS } from "../utils/constants"

/**
 * CUSTOM HOOK: home page ki restaurant list laata hai.
 *
 * Custom hook = ek normal function jo "use" se shuru hota hai aur andar
 * React ke hooks (useState/useEffect) use karta hai.
 *
 * Fayda: Body component ko ab fetch, loading, error ki tension nahi.
 * Wo sirf itna bolta hai — "mujhe list do" — aur UI banane pe focus karta hai.
 * Kal koi doosra component bhi list dikhana chahe, to ye ek line mein mil jaayegi.
 *
 * @returns {{ restaurants: Array, status: string }}
 */
export const useRestaurantList = () => {
  const [restaurants, setRestaurants] = useState([])
  const [status, setStatus] = useState(STATUS.LOADING)

  useEffect(() => {
    // useEffect ka callback khud async nahi ho sakta,
    // isliye andar ek async function bana ke turant call karte hain
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
    // khaali [] matlab: sirf ek baar chalega, jab component mount hoga
  }, [])

  return { restaurants, status }
}
