import { Link } from "react-router-dom"

/**
 * Ek restaurant ka card.
 *
 * "Dumb" component hai — khud data nahi laata, sirf props leta hai aur dikhata hai.
 * Isi wajah se ise kahin bhi reuse kar sakte ho.
 *
 * @param {object} props.data - parsers.js se aaya saaf object
 */
const RestaurantCard = ({ data }) => {
  const { id, name, cuisine, rating, deliveryTime, image } = data

  return (
    // Link poore card ko clickable banata hai — <a> ki tarah, par page reload ke bina
    <Link to={"/restaurant/" + id}>
      <div className="border-stone-200 border rounded-lg shadow-sm hover:shadow-md transition-shadow w-64 m-4 overflow-hidden cursor-pointer">

        <div className="w-full h-40 overflow-hidden">
          {/* alt zaroori hai — image na load ho to naam dikhega, aur screen readers ke liye bhi */}
          <img src={image} alt={name} className="h-full w-full object-cover" />
        </div>

        <div className="p-3">
          {/* truncate = lamba naam ek line mein "..." ke saath cut ho jaata hai */}
          <h3 className="font-bold text-base truncate">{name}</h3>
          <p className="text-sm text-gray-500 truncate">{cuisine}</p>

          <div className="flex items-center justify-between mt-2 text-sm">
            <span className="font-medium text-green-700">⭐ {rating}</span>
            <span className="text-gray-500 text-[12px]">{deliveryTime}</span>
          </div>
        </div>

      </div>
    </Link>
  )
}

export default RestaurantCard
