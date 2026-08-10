import { MapPin, ChevronDown, ShoppingBag, Search, X } from "lucide-react"
import { Link, NavLink } from "react-router-dom"
import { useCart } from "../../hooks/useCart"
import ThemeToggle from "../common/ThemeToggle"
import { useReverseGeocode } from "../../hooks/useReverseGeocode"



function Header({ searchText, setSearchText, coords }) {
  const { cartItems } = useCart()
  const placeName = useReverseGeocode(coords)

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:gap-6 sm:px-6 lg:px-8">

        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-lg font-black text-white shadow-card">
            Q
          </span>
          <span className="hidden text-xl font-extrabold tracking-tight sm:block">
            Quickbite
          </span>
        </Link>

        <button className="hidden shrink-0 items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-fg md:flex">
          <MapPin size={15} className="text-accent" />
          <span className="font-medium text-fg">{placeName}</span>
          <ChevronDown size={14} />
        </button>

        <div className="group flex h-10 flex-1 items-center gap-2 rounded-xl border border-line bg-surface-2 px-3 transition-colors focus-within:border-accent focus-within:bg-surface">
          <Search size={16} className="shrink-0 text-muted" />
          <input
            placeholder="Search restaurants or dishes"
            className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-muted"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {searchText && (
            <button
              onClick={() => setSearchText("")}
              aria-label="Clear search"
              className="shrink-0 cursor-pointer rounded-md p-0.5 text-muted transition-colors hover:text-fg"
            >
              <X size={14} />
            </button>
          )}
        </div>

     
          <ThemeToggle />

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <NavLink
            to="/cart"
            className="relative grid h-10 w-10 place-items-center rounded-xl text-muted transition-colors hover:bg-surface-2 hover:text-fg"
          >
            <ShoppingBag size={18} />

            {cartItems.length > 0 && (
              <span className="absolute top-1 right-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                {cartItems.length}
              </span>
            )}
          </NavLink>

          <button className="hidden h-10 cursor-pointer rounded-xl bg-fg px-4 text-sm font-semibold text-bg transition-opacity hover:opacity-85 sm:block">
            Sign In
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
