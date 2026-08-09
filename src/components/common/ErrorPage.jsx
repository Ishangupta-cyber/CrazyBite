import { useRouteError } from "react-router-dom"


export default function ErrorPage() {
  const error = useRouteError()

  return (
    <div className="px-8 py-20 text-center">
      <h1 className="text-3xl font-bold mb-2">Oops!</h1>
      <p className="text-gray-500 mb-1">Page Not Found</p>
      <p className="text-gray-400 text-sm">
        {error?.statusText || error?.message}
      </p>
    </div>
  )
}