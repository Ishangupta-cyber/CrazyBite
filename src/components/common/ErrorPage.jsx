import { useRouteError } from "react-router-dom"

/**
 * Poore page ka error — App.jsx mein `errorElement` ki tarah lagta hai.
 * Router isse tab dikhata hai jab URL galat ho ya route crash kar jaye.
 *
 * useRouteError() router se asli error nikaal ke deta hai — debugging ke kaam aata hai.
 */
export default function ErrorPage() {
  const error = useRouteError()

  return (
    <div className="px-8 py-20 text-center">
      <h1 className="text-3xl font-bold mb-2">Oops!</h1>
      <p className="text-gray-500 mb-1">Ye page mila hi nahi.</p>
      <p className="text-gray-400 text-sm">
        {error?.statusText || error?.message}
      </p>
    </div>
  )
}