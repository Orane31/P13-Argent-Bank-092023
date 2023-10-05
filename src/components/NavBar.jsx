import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import logo from '../assets/argentBankLogo.png'
import { useDispatch, useSelector } from 'react-redux'
import { logoutActionCreator } from '../redux/actions'

export default function NavBar() {

	const { userToken, isLoggedIn } = useSelector((state) => state.loginStore)
	const { userData } = useSelector((state) => state.userDataStore)
    const dispatch = useDispatch()

    const logOut = (e) => {
        e.preventDefault()
        dispatch(logoutActionCreator())
        localStorage.removeItem('token')
        // setIsLoggedIn(false);
        // TODO : add funtion logout -> action update state: isloggedin = false
        // localStorage.setItem()
    }


    return (
        <nav className='main-nav'>
            <Link className='main-nav-logo' to='/'>
                <img className='main-nav-logo-image' src={logo} alt="argent bank logo" />
                <h1 className='sr-only'>Argent Bank</h1>
            </Link>
            <div>
                {!isLoggedIn &&
                    <NavLink className='main-nav-item' to='/login'>
                        <i className='fa fa-user-circle'></i>
                    Sign In
                    </NavLink>
                }
                {isLoggedIn &&
                    <NavLink className='main-nav-item' to='/profile'>
                        <i className='fa fa-user-circle'></i>
                        {!userData && "Profile"}
                        {userData && userData.firstName}
                    </NavLink>
                }
                {isLoggedIn &&
                    <NavLink className='main-nav-item' onClick={logOut} to='/'>
                        <i className='fa fa-sign-out'></i>
                        Sign out
                    </NavLink>
                }
            </div>
        </nav>
    )
}
