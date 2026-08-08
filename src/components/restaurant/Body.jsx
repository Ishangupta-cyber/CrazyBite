import { useOutletContext } from "react-router-dom"
import RestaurantCard from "./RestaurantCard"
import { RestaurantListShimmer } from "../common/Shimmer"
import ErrorMessage from "../common/ErrorMessage"
import { useRestaurantList } from "../../hooks/useRestaurantList"
import { STATUS } from "../../utils/constants"

/**
 * HOME PAGE — restaurant list.
 *
 * Dekho ye component ab kitna chhota hai: koi fetch nahi, koi JSON parsing nahi.
 * Wo saara kaam useRestaurantList hook karta hai. Yahan bacha sirf "kya dikhana hai".
 * Yahi modular hone ka matlab hai — ek file ka ek hi kaam.
 */
const Body = () => {
  // Ek line mein data + status. Andar kya ho raha hai, isse farak nahi padta.
  const { restaurants, status } = useRestaurantList()

  // Search text Header ke paas hai, AppLayout ke Outlet ke through yahan aata hai
  const { searchText } = useOutletContext()

  // Filtering render ke waqt hoti hai, alag state mein nahi rakhi.
  // Kyunki ye do cheezon se nikaali ja sakti hai (list + searchText),
  // aur jo derive ho sakta hai use state banane se bugs aate hain.
  const filteredList = restaurants.filter((restaurant) =>
    restaurant.name?.toLowerCase().includes(searchText?.toLowerCase() ?? "")
  )

  return (
    <div className="px-8 py-6">
      <h2 className="text-xl font-bold mb-4">Restaurants near you</h2>

      {status === STATUS.LOADING && <RestaurantListShimmer />}

      {status === STATUS.ERROR && (
        <ErrorMessage message="Restaurants load nahi ho paaye. Thodi der baad try karo." />
      )}

      {status === STATUS.DONE && filteredList.length === 0 && (
        <p className="text-gray-500">Koi restaurant nahi mila.</p>
      )}

      {status === STATUS.DONE && (
        <div className="flex flex-wrap justify-center">
          {/* key React ko batati hai kaunsa card kaunsa hai — index nahi, asli id do */}
          {filteredList.map((restaurant) => (
            <RestaurantCard key={restaurant.id} data={restaurant} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Body
