import {
  CDN_URL,
  RESTAURANT_LIST_CARD_ID,
  MENU_TYPES,
} from "./constants"

// ============================================================
// PARSERS
//
// Swiggy ka raw JSON gande, gehre aur badalte huye shapes mein aata hai
// (data.cards[3].card.card.gridElements...). Agar ye shape seedha components
// mein use karoge, to kal Swiggy ne structure badla — poore app mein 20 jagah
// fix karna padega.
//
// Isliye ye file ek "translator" hai: raw JSON andar jaata hai, saaf-suthra
// simple object bahar aata hai. Components sirf saaf object dekhte hain.
// Swiggy badla → sirf ye file badlegi.
// ============================================================

// Image URL banane ka helper — Swiggy sirf ID deta hai, poora URL nahi
const buildImageUrl = (imageId) => (imageId ? CDN_URL + imageId : null)

// ------------------------------------------------------------
// 1. RESTAURANT LISTING (home page)
// ------------------------------------------------------------

/**
 * Ek restaurant ka raw object → card ke liye saaf object
 */
const toRestaurantCard = (restaurant) => {
  const info = restaurant?.info

  return {
    id: info?.id,
    name: info?.name,
    // cuisines ek ARRAY hai (["Pizzas", "Fast Food"]) — join se readable string banti hai
    cuisine: info?.cuisines?.join(", "),
    rating: info?.avgRating,
    // sla.slaString already ready text hai — "30-35 mins"
    deliveryTime: info?.sla?.slaString,
    image: buildImageUrl(info?.cloudinaryImageId),
  }
}

/**
 * Listing API ka poora JSON → restaurants ka saaf array
 */
export const parseRestaurantList = (json) => {
  // Poore cards array mein se wahi card dhundo jiski id match kare.
  // .find() ek match milte hi ruk jaata hai.
  const listingCard = json?.data?.cards?.find(
    (c) => c?.card?.card?.id === RESTAURANT_LIST_CARD_ID
  )

  const rawList =
    listingCard?.card?.card?.gridElements?.infoWithStyle?.restaurants ?? []

  return rawList.map(toRestaurantCard)
}

// ------------------------------------------------------------
// 2. RESTAURANT MENU (detail page)
// ------------------------------------------------------------

/**
 * Ek dish ka raw object → saaf object
 */
const toMenuItem = (itemCard) => {
  const info = itemCard?.card?.info

  return {
    id: info?.id,
    name: info?.name,
    // GOTCHA 1: price PAISE mein aata hai — 28900 matlab ₹289
    // GOTCHA 2: field ka naam fix nahi — kisi item pe price, kisi pe defaultPrice.
    //           ?? chain pehla non-null wala utha leti hai.
    price: (info?.price ?? info?.defaultPrice ?? info?.finalPrice ?? 0) / 100,
    description: info?.description,
    image: buildImageUrl(info?.imageId),
    // isVeg number aata hai (1 ya undefined), boolean nahi — yahin convert kar do
    isVeg: info?.isVeg === 1,
    rating: info?.ratings?.aggregatedRating?.rating,
  }
}

/**
 * Menu JSON → restaurant ki basic detail (page ke header ke liye)
 */
export const parseRestaurantInfo = (json) => {
  const info = json?.data?.cards?.find(
    (c) => c?.card?.card?.["@type"] === MENU_TYPES.RESTAURANT
  )?.card?.card?.info

  // Restaurant hi nahi mila to null — hook isse "error" maan lega
  if (!info) return null

  return {
    name: info.name,
    cuisine: info.cuisines?.join(", "),
    rating: info.avgRating,
    totalRatings: info.totalRatingsString,
    deliveryTime: info.sla?.slaString,
    costForTwo: info.costForTwoMessage,
    area: info.areaName,
  }
}

/**
 * Menu JSON → categories ka flat array: [{ title, items: [...] }]
 *
 * Yahan ek trap hai: Swiggy DO tarah ke category cards bhejta hai.
 *   - ItemCategory        → seedha itemCards array andar hai
 *   - NestedItemCategory  → andar categories[] hai, uske andar itemCards
 * Sirf pehla handle karoge to aadha menu gayab ho jaayega.
 * Isliye dono ko flatten karke ek hi simple list bana rahe hain.
 */
export const parseMenuCategories = (json) => {
  // Saari categories ek "groupedCard" ke andar chhupi hoti hain
  const groups =
    json?.data?.cards?.find((c) => c?.groupedCard)?.groupedCard?.cardGroupMap
      ?.REGULAR?.cards ?? []

  const categories = []

  groups.forEach((group) => {
    const card = group?.card?.card

    // Case 1: normal category
    if (card?.["@type"] === MENU_TYPES.ITEM_CATEGORY) {
      categories.push({
        title: card.title,
        items: (card.itemCards ?? []).map(toMenuItem),
      })
    }

    // Case 2: nested — har sub-category ko alag category bana do
    if (card?.["@type"] === MENU_TYPES.NESTED_ITEM_CATEGORY) {
      ;(card.categories ?? []).forEach((sub) => {
        categories.push({
          title: `${card.title} • ${sub.title}`,
          items: (sub.itemCards ?? []).map(toMenuItem),
        })
      })
    }

    // Baaki cards (banners, FAQs, license info) hume nahi chahiye — skip
  })

  // Khaali categories dikhane ka koi matlab nahi
  return categories.filter((category) => category.items.length > 0)
}
