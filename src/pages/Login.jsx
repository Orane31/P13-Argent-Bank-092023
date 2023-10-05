import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginReducer } from '../redux/loginReducer'
import { fetchUserDataSuccessActionCreator, loginActionFailCreator, loginActionSuccessCreator } from '../redux/actions'
import { getCurrentUser } from '../utils/getCurrentUser'

export default function Login() {

	const baseURL = "http://localhost:3001/api/v1"
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [remember, setRemember] = useState(false)
	let navigate = useNavigate()
	const { userToken, isLoggedIn } = useSelector((state) => state.loginStore)
	const { userData } = useSelector((state) => state.userDataStore)
	const dispatch = useDispatch()

	useEffect(() => {
		if (isLoggedIn) {
			// console.log(tokenLocal)
			navigate("/profile")
		}	
	}, [isLoggedIn, navigate])


	const login = (email, password) => {
		return axios.post(baseURL + "/user/login", {
			email: email,
			password: password,
		})
	}

	// const getCurrentUser = (token) => {
	// 	return axios({
	// 		method: "POST",
	// 		url: baseURL + "/user/profile",
	// 		headers: { Authorization: `Bearer ${token}` },
	// 		})
	// 		.then((res) => {
	// 			// remplace with : useDispatch ( action success avec res.data.body en param)
	// 			dispatch(fetchUserDataSuccessActionCreator(res.data.body))
	// 			// setUserData(res.data.body);

	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// };

	const handleRemember = () => {
		setRemember(!remember)
	}

    const handleSubmit = async (e) => {   
		e.preventDefault();
		remember ? localStorage.setItem('email', email) : localStorage.removeItem('email')
		await login(email, password)
			.then((res) => {
				// TODO: remplace with : useDispatch
				console.log("ok")
				// setUserToken(res.data.body.token)
				localStorage.setItem('token', res.data.body.token)
				dispatch(loginActionSuccessCreator(res.data.body.token))
				return res.data.body.token
			})
			.then(async (token) => {
				let userInfos = await getCurrentUser(token)
				dispatch(fetchUserDataSuccessActionCreator(userInfos))
				// setIsLoggedIn(true)

			})
			.catch((err) => {
				console.log(err)
				dispatch(loginActionFailCreator())
				// setIsLoggedIn(false)
		});
    }

	return (
		<main className="main bg-dark">
			<section className="sign-in-content">
				<i className="fa fa-user-circle sign-in-icon"></i>
				<h1>Sign In</h1>
				<form onSubmit={handleSubmit}>
				<div className="input-wrapper">
					<label htmlFor="username">Username
					</label>
					<input type="text" id="username" onChange={(e) => setEmail(e.target.value)}/>
				</div>
				<div className="input-wrapper">
					<label htmlFor="password">Password</label>
					<input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
				</div>
				<div className="input-remember">
					<input type="checkbox" id="remember-me" checked={remember} onChange={handleRemember} />
					<label htmlFor="remember-me">Remember me</label>
				</div>
				<button type='submit' className='sign-in-button'>
					Sign in
				</button>
				</form>
			</section>
		</main>
  )
}
