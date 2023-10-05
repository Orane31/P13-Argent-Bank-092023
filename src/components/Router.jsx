import React from 'react'
import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom' 
import NavBar from './NavBar'
import Footer from './Footer'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Home from '../pages/Home'
import { useDispatch } from 'react-redux'
import { fetchUserDataSuccessActionCreator, loginActionSuccessCreator } from '../redux/actions'
import { getCurrentUser } from '../utils/getCurrentUser'

export default function Router() {

  const dispatch = useDispatch()
  const localToken = localStorage.getItem('token')

  useEffect(() => {
    if (localToken) {
      dispatch(loginActionSuccessCreator(localToken))
      getCurrentUser(localToken)
      .then((res) => {
        dispatch(fetchUserDataSuccessActionCreator(res))
      })
    }
  }, [])


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
