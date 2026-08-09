import { useOutletContext } from "react-router-dom"
import RestaurantCard from "./RestaurantCard"
import { RestaurantListShimmer } from "../common/Shimmer"
import ErrorMessage from "../common/ErrorMessage"
import { useRestaurantList } from "../../hooks/useRestaurantList"
import { STATUS } from "../../utils/constants"



const Body = () => {

  const { restaurants, status } = useRestaurantList()


  const { searchText } = useOutletContext()


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
          
          {filteredList.map((restaurant) => (
            <RestaurantCard key={restaurant.id} data={restaurant} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Body
