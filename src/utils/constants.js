// ============================================================
// Saari "magic values" ek jagah. Kabhi bhi URL ya koi fixed
// string component ke andar mat likhna — badalna pade to poore
// codebase mein dhundhna padega.
// ============================================================

// Location ke hisaab se hi Swiggy restaurants deta hai
const LAT = "28.5921"
const LNG = "77.0460"

// ---------- API URLs ----------

// Restaurant listing (home page)
export const SWIGGY_API_URL = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${LAT}&lng=${LNG}&page_type=DESKTOP_WEB_LISTING`

// Ek restaurant ka menu.
// NOTE: /dapi/menu/pl ab block hai — 202 aur khaali body deta hai (error bhi nahi,
// isliye res.json() crash karta hai). /mapi/ wala chalta hai.
// resId har restaurant ka alag hai isliye ye function hai, string nahi.
export const SWIGGY_MENU_URL = (resId) =>
  `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${LAT}&lng=${LNG}&restaurantId=${resId}`

// Browser Swiggy ko seedha call nahi kar sakta (CORS block karta hai).
// Ye proxy beech mein baith ke request forward karta hai.
export const CORS_PROXY = "https://proxy.corsfix.com/?"

// Swiggy images ka poora URL nahi deta, sirf ek ID — is prefix ke saath jodna padta hai
export const CDN_URL = "https://media-assets.swiggy.com/swiggy/image/upload/"

// ---------- JSON ke andar ke "landmarks" ----------
// Swiggy ka JSON bahut bada hai aur cards ka order badalta rehta hai.
// Isliye index (cards[4]) pe kabhi bharosa mat karo — ye ID/type se dhundo.

// Listing API: is id waale card ke andar asli restaurant list hai
export const RESTAURANT_LIST_CARD_ID = "restaurant_grid_listing_v2"

// Menu API: har card apna "@type" batata hai
export const MENU_TYPES = {
  // restaurant ki basic detail (naam, rating, delivery time)
  RESTAURANT: "type.googleapis.com/swiggy.presentation.food.v2.Restaurant",
  // seedhi dish list waali category — jaise "Recommended"
  ITEM_CATEGORY: "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
  // andar aur sub-categories waali — jaise "Flavour Fun Pizzas > Combos and Deals"
  NESTED_ITEM_CATEGORY:
    "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory",
}

// ---------- Fetch ke teen possible states ----------
// String "loading" har jagah type karne se typo ka risk hai, isliye constant
export const STATUS = {
  LOADING: "loading",
  DONE: "done",
  ERROR: "error",
}