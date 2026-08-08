import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./components/layout/AppLayout"
import ErrorPage from "./components/common/ErrorPage"
import Body from "./components/restaurant/Body"
import RestaurantMenu from "./components/menu/RestaurantMenu"
import Cart from "./components/cart/Cart"

/**
 * Router = kaunse URL pe kaunsa component dikhega, uska naksha.
 *
 * AppLayout parent hai aur baaki saare uske "children" —
 * matlab Header/Footer har page pe rahega, sirf beech ka hissa badlega.
 */
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    // Kahin bhi error aaya to ye page dikhega
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        // ":resId" = dynamic hissa. /restaurant/442422 pe resId = "442422"
        // Component isse useParams() se padhta hai.
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={appRouter} />
}