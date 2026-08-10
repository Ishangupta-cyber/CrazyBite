import {
  CDN_URL,
  RESTAURANT_CARD_IDS,
  MENU_TYPES,
} from "./constants"



const buildImageUrl = (imageId) => (imageId ? CDN_URL + imageId : null)


const toRestaurantCard = (restaurant) => {
  const info = restaurant?.info

  return {
    id: info?.id,
    name: info?.name,

    cuisine: info?.cuisines?.join(", "),
    rating: info?.avgRating,
    ratingCount: info?.totalRatingsString,

    deliveryTime: info?.sla?.slaString,
    distance: info?.sla?.lastMileTravelString,

    area: info?.locality || info?.areaName,
    costForTwo: info?.costForTwo,

    // "50% OFF" + "FLAT DEAL" — card ke image overlay pe dikhate hain
    offer: info?.aggregatedDiscountInfoV3?.header,
    offerTag: info?.aggregatedDiscountInfoV3?.discountTag,

    isOpen: info?.isOpen !== false,
    image: buildImageUrl(info?.cloudinaryImageId),
  }
}


const readRestaurantsFromCard = (cards, cardId) =>
  cards.find((c) => c?.card?.card?.id === cardId)?.card?.card?.gridElements
    ?.infoWithStyle?.restaurants ?? []


export const parseRestaurantList = (json) => {
  const cards = json?.data?.cards ?? []

  // dono cards mein kuch restaurants common hote hain, isliye id pe dedupe
  const byId = new Map()

  RESTAURANT_CARD_IDS.forEach((cardId) => {
    readRestaurantsFromCard(cards, cardId).forEach((restaurant) => {
      const parsed = toRestaurantCard(restaurant)

      if (parsed.id && !byId.has(parsed.id)) {
        byId.set(parsed.id, parsed)
      }
    })
  })

  return [...byId.values()]
}



const toMenuItem = (itemCard) => {
  const info = itemCard?.card?.info

  return {
    id: info?.id,
    name: info?.name,
  
    price: (info?.price ?? info?.defaultPrice ?? info?.finalPrice ?? 0) / 100,

    description: info?.description,
    image: buildImageUrl(info?.imageId),

    isVeg: info?.isVeg === 1,
    rating: info?.ratings?.aggregatedRating?.rating,
  }
}


export const parseRestaurantInfo = (json) => {
  const info = json?.data?.cards?.find(
    (c) => c?.card?.card?.["@type"] === MENU_TYPES.RESTAURANT
  )?.card?.card?.info

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



export const parseMenuCategories = (json) => {
  // Saari categories ek "groupedCard" ke andar chhupi hain
  const groups =
    json?.data?.cards?.find((c) => c?.groupedCard)?.groupedCard?.cardGroupMap
      ?.REGULAR?.cards ?? []

  const categories = []

  groups.forEach((group) => {
    const card = group?.card?.card

    if (card?.["@type"] === MENU_TYPES.ITEM_CATEGORY) {
      categories.push({
        title: card.title,
        items: (card.itemCards ?? []).map(toMenuItem),
      })
    }

    if (card?.["@type"] === MENU_TYPES.NESTED_ITEM_CATEGORY) {
      (card.categories ?? []).forEach((sub) => {
        categories.push({
          title: `${card.title} • ${sub.title}`,
          items: (sub.itemCards ?? []).map(toMenuItem),
        })
      })
    }

  })

  return categories.filter((category) => category.items.length > 0)
}
