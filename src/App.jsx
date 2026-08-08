import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Error from './components/Error'
import Body from './components/Body'
import RestaurantMenu from './components/RestaurantMenu'


export default function App() {


  const appRouter=createBrowserRouter([
    {
      path:"/",
      element:<AppLayout/>,
      errorElement:<Error/>,
      children:[
        {
          path:"/",
          element:<Body/>
        },
        {
          path:"/restaurant/:resId",
          element:<RestaurantMenu/>
        }
      ]
    }
  ])


  return (
    <RouterProvider router={appRouter}  />
  )
}

