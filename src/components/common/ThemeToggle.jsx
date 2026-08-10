import { Sun, Moon } from "lucide-react"
import { useTheme } from "../../hooks/useTheme"

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-2 rounded-full hover:bg-surface transition-colors cursor-pointer"
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  )
}

export default ThemeToggle