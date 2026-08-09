import { MapPin, ChevronDown, ShoppingCart, Search } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "../../hooks/useCart"



function Header({ searchText, setSearchText }) {
  const { cartItems } = useCart()

  return (
    <div className="flex items-center justify-between gap-6 px-8 py-3 shadow-sm">

      <div className="flex items-center gap-2">
        <Link to="/">
          <h3 className="text-2xl font-bold text-orange-500">Quickbite</h3>
        </Link>
        <div className="flex items-center gap-1 text-sm text-gray-600 cursor-pointer">
          <MapPin size={16} className="text-orange-500" />
          <span>Dehradun</span>
          <ChevronDown size={14} />
        </div>
      </div>


      <div className="flex-1 max-w-md flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2">
        <Search size={16} className="text-gray-400" />
        <input
          placeholder="Search for restaurant and food"
          className="w-full text-sm outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-6">
        <Link to="/cart">
          <div className="flex items-center gap-1 text-sm font-medium cursor-pointer">
            <ShoppingCart size={18} />
            <span>Cart ({cartItems.length})</span>
          </div>
        </Link>

        <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-600">
          Sign In
        </button>
      </div>
    </div>
  )
}

export default Header