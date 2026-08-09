import { CORS_PROXY } from "./constants"




export const fetchFromSwiggy = async (url) => {
  const response = await fetch(CORS_PROXY + url)

 
  
  if (!response.ok) {
    throw new Error(`Swiggy API request failed with status ${response.status}`)
  }

  return response.json()
}
