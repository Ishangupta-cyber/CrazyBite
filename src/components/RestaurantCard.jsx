import { Link } from "react-router-dom"


const RestaurantCard = (props) => {
  const { id, name, cuisine, rating, deliveryTime, image } = props.data

  return (
    <Link to = {"/restaurant/"+id}>

     <div className="border-stone-200 border rounded-lg shadow-sm hover:shadow-md transition-shadow w-64 m-4 overflow-hidden cursor-pointer">

      <div className="w-full h-40 overflow-hidden">
        <img src={image} className="h-full w-full object-cover" />
      </div>

      <div className="p-3">
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