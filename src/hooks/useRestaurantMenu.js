import { useEffect, useState } from "react"
import { fetchFromSwiggy } from "../utils/api"
import { parseRestaurantInfo, parseMenuCategories } from "../utils/parsers"
import { SWIGGY_MENU_URL, STATUS } from "../utils/constants"

/**
 * CUSTOM HOOK: ek restaurant ka menu laata hai.
 *
 * @param {string} resId - URL se aane waali restaurant id
 * @returns {{ restaurant: object|null, categories: Array, status: string }}
 */
export const useRestaurantMenu = (resId) => {
  const [restaurant, setRestaurant] = useState(null)
  const [categories, setCategories] = useState([])
  const [status, setStatus] = useState(STATUS.LOADING)

  useEffect(() => {
    // ignore = "purana response aaya to use fenk do".
    // Agar user ek restaurant khol ke turant doosra khol le, to pehli request
    // baad mein aake nayi wali ko overwrite kar sakti hai. Ye flag usse rokta hai.
    let ignore = false

    const fetchMenu = async () => {
      setStatus(STATUS.LOADING)

      try {
        const json = await fetchFromSwiggy(SWIGGY_MENU_URL(resId))
        if (ignore) return

        const info = parseRestaurantInfo(json)

        // Restaurant hi nahi mila (galat id / band restaurant) → error dikhao
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

    // Cleanup: component hatte ya resId badle to purani request ka result mat lagana
    return () => {
      ignore = true
    }
    // [resId] matlab: id badlegi to menu dobara fetch hoga
  }, [resId])

  return { restaurant, categories, status }
}