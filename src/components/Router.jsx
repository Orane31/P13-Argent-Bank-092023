import React from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom' 
import NavBar from './NavBar'
import Footer from './Footer'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Home from '../pages/Home'

export default function Router() {
  const Layout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
  }

  const BrowserRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/profile",
                element: <Profile />
            }
        ]
    }
  ])

  return (
    <RouterProvider router={BrowserRoutes} />
  )
}
