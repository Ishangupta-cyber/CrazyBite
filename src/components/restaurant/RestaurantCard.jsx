import { Link } from "react-router-dom"
import { Star, Clock } from "lucide-react"


// hover pe hi menu ka chunk le aao, taaki click pe shimmer na dikhe
const prefetchMenu = () => {
  import("../menu/RestaurantMenu")
}


const RestaurantCard = ({ data }) => {
  const {
    id,
    name,
    cuisine,
    rating,
    deliveryTime,
    image,
    offer,
    offerTag,
    area,
    costForTwo,
    isOpen,
  } = data

  return (
    <Link
      to={"/restaurant/" + id}
      onMouseEnter={prefetchMenu}
      onFocus={prefetchMenu}
      className="group block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-card-lg">

        <div className="relative aspect-4/3 overflow-hidden bg-surface-2">
          {image && (
            <img
              src={image}
              alt={name}
              loading="lazy"
              className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                isOpen ? "" : "grayscale"
              }`}
            />
          )}

          {/* neeche se upar gradient — taaki offer text har image pe padha jaye */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/85 via-black/35 to-transparent" />

          {offer && (
            <div className="absolute inset-x-0 bottom-0 p-3">
              <p className="text-base leading-tight font-extrabold text-white">
                {offer}
              </p>

              {offerTag && (
                <p className="text-[11px] font-semibold tracking-wide text-white/80 uppercase">
                  {offerTag}
                </p>
              )}
            </div>
          )}

          {!isOpen && (
            <div className="absolute inset-0 grid place-items-center bg-black/55">
              <span className="rounded-lg bg-white/95 px-3 py-1 text-xs font-bold tracking-wide text-black uppercase">
                Currently closed
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1 p-3.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-[15px] font-bold text-fg">{name}</h3>

            {rating && (
              <span className="flex shrink-0 items-center gap-0.5 rounded-md bg-veg px-1.5 py-0.5 text-[11px] font-bold text-white">
                <Star size={10} className="fill-current" />
                {rating}
              </span>
            )}
          </div>

          <p className="truncate text-[13px] text-muted">{cuisine}</p>

          <div className="mt-auto flex items-center gap-1.5 pt-2 text-[12px] text-muted">
            <Clock size={12} className="shrink-0" />
            <span className="truncate">{deliveryTime}</span>

            {costForTwo && (
              <>
                <span aria-hidden="true">•</span>
                <span className="truncate">{costForTwo}</span>
              </>
            )}
          </div>

          {area && <p className="truncate text-[12px] text-muted/70">{area}</p>}
        </div>
      </article>
    </Link>
  )
}

export default RestaurantCard
