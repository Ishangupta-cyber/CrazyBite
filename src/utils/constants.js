
const LAT = "28.5921"
const LNG = "77.0460"


export const SWIGGY_API_URL = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${LAT}&lng=${LNG}&page_type=DESKTOP_WEB_LISTING`


export const SWIGGY_MENU_URL = (resId) =>
  `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${LAT}&lng=${LNG}&restaurantId=${resId}`


export const CORS_PROXY = "https://proxy.corsfix.com/?"


export const CDN_URL = "https://media-assets.swiggy.com/swiggy/image/upload/"



// Swiggy restaurants ko do alag cards mein bhejta hai — dono se uthate hain,
// warna sirf 8 milte hain jabki 23 unique available hote hain.
export const TOP_BRANDS_CARD_ID = "top_brands_for_you"

export const RESTAURANT_LIST_CARD_ID = "restaurant_grid_listing_v2"


export const RESTAURANT_CARD_IDS = [TOP_BRANDS_CARD_ID, RESTAURANT_LIST_CARD_ID]



export const MENU_TYPES = {

  // restaurant ki basic detail (naam, rating, delivery time)
  RESTAURANT: "type.googleapis.com/swiggy.presentation.food.v2.Restaurant",

  
  // seedhi dish list waali category — jaise "Recommended"
  ITEM_CATEGORY: "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",

  
  // andar aur sub-categories waali — jaise "Flavour Fun Pizzas > Combos and Deals"
  NESTED_ITEM_CATEGORY:
    "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory",
}



export const STATUS = {
  LOADING: "loading",
  DONE: "done",
  ERROR: "error",
}