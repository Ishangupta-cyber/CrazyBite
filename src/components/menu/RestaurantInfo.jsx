/**
 * Menu page ka upar wala hissa — restaurant ka naam, rating, delivery time.
 * Sirf display ka kaam, koi logic nahi.
 */
const RestaurantInfo = ({ restaurant }) => {
  return (
    <>
      <h1 className="text-2xl font-bold">{restaurant.name}</h1>
      <p className="text-gray-500 mb-1">{restaurant.cuisine}</p>
      <p className="text-gray-400 text-sm mb-2">{restaurant.area}</p>

      <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
        <span className="font-medium text-green-700">⭐ {restaurant.rating}</span>
        <span>({restaurant.totalRatings})</span>
        <span>{restaurant.deliveryTime}</span>
        <span>{restaurant.costForTwo}</span>
      </div>
    </>
  )
}

export default RestaurantInfo
