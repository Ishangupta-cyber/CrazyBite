import { lazy, Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./components/layout/AppLayout"
import ErrorPage from "./components/common/ErrorPage"
import Body from "./components/restaurant/Body"
import { RestaurantListShimmer, MenuShimmer } from "./components/common/Shimmer"


const RestaurantMenu = lazy(() => import("./components/menu/RestaurantMenu"))
const Cart = lazy(() => import("./components/cart/Cart"))

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/restaurant/:resId",
        element: (
          <Suspense fallback={<MenuShimmer />}>
            <RestaurantMenu />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<RestaurantListShimmer count={3} />}>
            <Cart />
          </Suspense>
        ),
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={appRouter} />
}
