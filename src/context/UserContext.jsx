import { createContext, useContext, useState } from "react"

const STORAGE_KEY = "quickbite-user"

const UserContext = createContext(null)

// localStorage sirf strings rakhta hai, aur user ek object hai ({ name: "Ishan" }),
// isliye stringify/parse chahiye. Corrupt value pe app crash na ho isliye try/catch.
const readStoredUser = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : null
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser)

  const login = (name) => {
    const newUser = { name }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
    setUser(newUser)
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error("useUser must be used inside UserProvider")
  return context
}
