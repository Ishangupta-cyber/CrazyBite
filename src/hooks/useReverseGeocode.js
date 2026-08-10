import { useState, useEffect } from "react"

export const useReverseGeocode = (coords) => {
  const [placeName, setPlaceName] = useState(null)

  useEffect(() => {
    if (!coords) return

    const fetchPlace = async () => {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`
      const res = await fetch(url)
      const data = await res.json()

      const area =
        data.address?.suburb ||
        data.address?.city_district ||
        data.address?.city ||
        data.address?.town ||
        "Unknown"

      setPlaceName(area)
    }

    fetchPlace()
  }, [coords])

  return placeName
}