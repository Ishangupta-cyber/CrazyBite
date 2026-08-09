import AddToCartButton from "./AddToCartButton"


const MenuItem = ({ item }) => {
  return (
    <div className="flex justify-between items-start gap-4 py-4 border-t border-gray-100">

     
      <div className="flex flex-col flex-1">
        <span
          className={`text-[11px] font-bold ${
            item.isVeg ? "text-green-600" : "text-red-600"
          }`}
        >
          {item.isVeg ? "● VEG" : "▲ NON-VEG"}
        </span>

        <span className="font-medium">{item.name}</span>
        <span className="text-gray-500 text-sm">₹{item.price}</span>

        
        {item.rating && (
          <span className="text-xs text-green-700 mt-0.5">⭐ {item.rating}</span>
        )}

        {item.description && (
          <p className="text-gray-400 text-xs mt-1 line-clamp-2">
            {item.description}
          </p>
        )}
      </div>

      <div className="flex flex-col items-center gap-2 w-28 shrink-0">
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className="w-28 h-24 object-cover rounded-lg"
          />
        )}

        <AddToCartButton item={item} />
      </div>

    </div>
  )
}

export default MenuItem
