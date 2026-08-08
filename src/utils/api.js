import { CORS_PROXY } from "./constants"

/**
 * Swiggy se data laane ka ek hi darwaza.
 *
 * Har jagah `fetch(CORS_PROXY + url)` likhne ke bajaye ye helper use karo —
 * kal ko proxy badla ya koi header add karna pada, to sirf yahi file badlegi.
 *
 * @param {string} url - Swiggy ka poora URL (proxy ke bina)
 * @returns {Promise<object>} parsed JSON
 */
export const fetchFromSwiggy = async (url) => {
  const response = await fetch(CORS_PROXY + url)

  // fetch sirf network fail hone pe throw karta hai — 404/500 pe nahi.
  // Isliye status khud check karna padta hai.
  if (!response.ok) {
    throw new Error(`Swiggy API ne ${response.status} bheja`)
  }

  return response.json()
}
