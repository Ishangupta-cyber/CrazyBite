import { useOutletContext } from "react-router-dom"
import { SearchX } from "lucide-react"
import RestaurantCard from "./RestaurantCard"
import { RestaurantListShimmer } from "../common/Shimmer"
import ErrorMessage from "../common/ErrorMessage"
import { useRestaurantList } from "../../hooks/useRestaurantList"
import { STATUS } from "../../utils/constants"
import { RESTAURANT_GRID } from "../../utils/styles"
import { useEffect, useRef, useState } from "react"
import { useReverseGeocode } from "../../hooks/useReverseGeocode"


const Body = () => {
  const { coords } = useOutletContext()
  const placeName = useReverseGeocode(coords)
  const [visibleCount, setVisibleCount] = useState(8)
   const loaderRef = useRef(null)

  const { restaurants, status } = useRestaurantList(coords)

  const { searchText } = useOutletContext()

  const filteredList = restaurants.filter((restaurant) =>
    restaurant.name?.toLowerCase().includes(searchText?.toLowerCase() ?? "")
  )
  const visibleList = filteredList.slice(0, visibleCount)

    useEffect(() => {
        if (status !== STATUS.DONE) return
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setVisibleCount((prev) => prev + 8)
    }
  })

  if (loaderRef.current) {
    observer.observe(loaderRef.current)
  }

  return () => observer.disconnect()
}, [status])

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

      <section className="mb-8">
        <p className="mb-1.5 text-sm font-semibold tracking-wide text-accent uppercase">
          Delivering to {placeName}
        </p>

        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          What are you craving?
        </h1>

        <p className="mt-2 max-w-lg text-[15px] text-muted">
          Aas-paas ke best restaurants, seedha aapke darwaze tak.
        </p>
      </section>

      {status === STATUS.LOADING && <RestaurantListShimmer />}

      {status === STATUS.ERROR && (
        <ErrorMessage message="Restaurants load nahi ho paaye. Thodi der baad try karo." />
      )}

      {status === STATUS.DONE && (
        <>
          <div className="mb-5 flex items-baseline justify-between border-b border-line pb-3">
            <h2 className="text-lg font-bold">
              {searchText ? "Search results" : "All restaurants"}
            </h2>

            <span className="text-sm text-muted">
              {visibleList.length}{" "}
              {visibleList.length === 1 ? "place" : "places"}
            </span>
          </div>

          {visibleList.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-surface-2 text-muted">
                <SearchX size={24} />
              </div>

              <p className="text-lg font-semibold">
                {searchText ? `No results for "${searchText}"` : "No restaurants found"}
              </p>

              
            </div>
          ) : (
            <div className={RESTAURANT_GRID}>
              {visibleList.map((restaurant, index) => (
                <div
                  key={restaurant.id}
                  className="animate-rise"
                  style={{ animationDelay: `${Math.min(index, 11) * 40}ms` }}
                >
                  <RestaurantCard data={restaurant} />
                </div>
              ))}
            </div>
          )}
          <div ref={loaderRef} className="h-4"></div>
        </>
      )}
    </main>
  )
}

export default Body
