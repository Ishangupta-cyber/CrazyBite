import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./components/layout/AppLayout"
import ErrorPage from "./components/common/ErrorPage"
import Body from "./components/restaurant/Body"
import RestaurantMenu from "./components/menu/RestaurantMenu"
import Cart from "./components/cart/Cart"



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