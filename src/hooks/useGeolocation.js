import { useState, useEffect } from "react"

const FALLBACK_COORDS = { lat: 28.5921, lng: 77.0460 }  

export const useGeolocation = () => {
  const [coords, setCoords] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported")
      setCoords(FALLBACK_COORDS)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      (err) => {
        setError(err.message)
        setCoords(FALLBACK_COORDS)   
      }
    )
  }, [])

  return { coords, error }
}