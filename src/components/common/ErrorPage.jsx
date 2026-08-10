import { useRouteError, Link } from "react-router-dom"
import { Compass } from "lucide-react"


export default function ErrorPage() {
  const error = useRouteError()

  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-3xl bg-surface-2 text-muted">
          <Compass size={32} />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight">Oops!</h1>

        <p className="text-[15px] text-muted">
          Ye page exist nahi karta ya kuch toot gaya hai.
        </p>

        {(error?.statusText || error?.message) && (
          <code className="rounded-lg bg-surface-2 px-3 py-1.5 text-xs text-muted">
            {error.statusText || error.message}
          </code>
        )}

        <Link
          to="/"
          className="mt-2 rounded-xl bg-accent px-6 py-2.5 text-sm font-bold text-white shadow-card transition-opacity hover:opacity-90"
        >
          Go home
        </Link>
      </div>
    </main>
  )
}
