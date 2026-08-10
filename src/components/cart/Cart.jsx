import { Trash2, ShoppingBag, ChevronLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "../../hooks/useCart"


const VegDot = ({ isVeg }) => (
  <span
    className={`grid h-3.5 w-3.5 shrink-0 place-items-center rounded-[3px] border ${
      isVeg ? "border-veg" : "border-nonveg"
    }`}
  >
    <span
      className={`h-1.5 w-1.5 rounded-full ${isVeg ? "bg-veg" : "bg-nonveg"}`}
    />
  </span>
)


export default function Cart() {
  const { cartItems, removeEntry, clearCart, totalPrice } = useCart()

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="grid h-20 w-20 place-items-center rounded-3xl bg-surface-2 text-muted">
            <ShoppingBag size={32} />
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight">
            Your cart is empty
          </h1>

          <p className="max-w-xs text-[15px] text-muted">
            Abhi tak kuch add nahi kiya. Kuch mangwa lete hain?
          </p>

          <Link
            to="/"
            className="mt-2 rounded-xl bg-accent px-6 py-2.5 text-sm font-bold text-white shadow-card transition-opacity hover:opacity-90"
          >
            Browse restaurants
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">

      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-accent"
      >
        <ChevronLeft size={16} />
        Keep browsing
      </Link>

      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            My Cart
          </h1>
          <p className="mt-1 text-sm text-muted">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </p>
        </div>

        <button
          onClick={clearCart}
          className="cursor-pointer rounded-lg px-3 py-1.5 text-sm font-semibold text-nonveg transition-colors hover:bg-nonveg/10"
        >
          Clear cart
        </button>
      </div>

      <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
        {cartItems.map((entry) => (
          <div key={entry.cartId} className="flex items-center gap-3 p-4">
            {entry.image ? (
              <img
                src={entry.image}
                alt={entry.name}
                loading="lazy"
                className="h-14 w-14 shrink-0 rounded-xl object-cover"
              />
            ) : (
              <div className="h-14 w-14 shrink-0 rounded-xl border border-dashed border-line bg-surface-2" />
            )}

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <VegDot isVeg={entry.isVeg} />
                <h3 className="truncate font-semibold text-fg">{entry.name}</h3>
              </div>

              <p className="mt-0.5 text-sm text-muted">₹{entry.price}</p>
            </div>

            <button
              onClick={() => removeEntry(entry.cartId)}
              aria-label={`Remove ${entry.name}`}
              className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-lg text-muted transition-colors hover:bg-nonveg/10 hover:text-nonveg"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-line bg-surface p-5 shadow-card">
        <div className="flex items-center justify-between">
          <span className="text-base font-bold">Total</span>

          <span className="text-2xl font-extrabold tabular-nums">
            ₹{totalPrice.toFixed(2)}
          </span>
        </div>

        <button className="mt-4 w-full cursor-pointer rounded-xl bg-accent py-3 text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90">
          Proceed to Checkout
        </button>
      </div>
    </main>
  )
}
