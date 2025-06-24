import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from '../pages/Home'
import Todolist from '../pages/Todolist'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import AppLayout from "../layouts/AppLayout"


const Router = createBrowserRouter([

  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index:true, element: <Home /> },
      { path: "about", element: <Todolist /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
    ]
  },


])

const AppRoutes = () => {
  return (
    <div>
      <RouterProvider router={Router} />
    </div>
  )
}

export default AppRoutes
