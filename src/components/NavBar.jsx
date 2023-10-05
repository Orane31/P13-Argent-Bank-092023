import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../context/Context'
import logo from '../assets/argentBankLogo.png'
import { useSelector } from 'react-redux'

export default function NavBar() {

	const { userToken, isLoggedIn } = useSelector((state) => state.loginStore)
	const { userData } = useSelector((state) => state.userDataStore)

    const logOut = (e) => {
        e.preventDefault()
        // setIsLoggedIn(false);
        // TODO : add funtion logout -> action update state: isloggedin = false
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
