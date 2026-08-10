import { Star, Clock, Wallet, MapPin } from "lucide-react"


const Stat = ({ icon: Icon, value, label }) => (
  <div className="flex flex-1 flex-col items-center gap-1 px-2 py-3 text-center">
    <Icon size={16} className="text-accent" />
    <span className="text-sm font-bold text-fg">{value}</span>
    <span className="text-[11px] tracking-wide text-muted uppercase">
      {label}
    </span>
  </div>
)


const RestaurantInfo = ({ restaurant }) => {
  return (
    <section className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-extrabold tracking-tight sm:text-3xl">
              {restaurant.name}
            </h1>

            <p className="mt-1 truncate text-[15px] text-muted">
              {restaurant.cuisine}
            </p>

            {restaurant.area && (
              <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
                <MapPin size={13} className="shrink-0" />
                <span className="truncate">{restaurant.area}</span>
              </p>
            )}
          </div>

          {restaurant.rating && (
            <div className="flex shrink-0 flex-col items-center rounded-xl bg-veg px-2.5 py-1.5 text-white">
              <span className="flex items-center gap-1 text-sm font-bold">
                <Star size={12} className="fill-current" />
                {restaurant.rating}
              </span>

              {restaurant.totalRatings && (
                <span className="text-[10px] font-medium opacity-90">
                  {restaurant.totalRatings}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex divide-x divide-line border-t border-line bg-surface-2/50">
        <Stat
          icon={Clock}
          value={restaurant.deliveryTime ?? "—"}
          label="Delivery"
        />
        <Stat
          icon={Wallet}
          value={restaurant.costForTwo ?? "—"}
          label="For two"
        />
        <Stat
          icon={Star}
          value={restaurant.totalRatings ?? "—"}
          label="Ratings"
        />
      </div>
    </section>
  )
}

export default RestaurantInfo
