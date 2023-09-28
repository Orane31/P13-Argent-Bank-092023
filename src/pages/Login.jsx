import React from 'react'
import axios from 'axios'
import { useState, useContext, useEffect } from 'react'
import { Context } from '../context/Context'
import { useNavigate } from 'react-router-dom'

export default function Login() {

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	let navigate = useNavigate()
	const { setUserToken, baseURL, isLoggedIn, setIsLoggedIn, userData, setUserData } = useContext(Context)

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/profile")
		}
	}, [isLoggedIn, setIsLoggedIn, navigate])

	const login = (email, password) => {
		return axios.post(baseURL + "/user/login", {
			email: email,
			password: password,
		})
	}

	const getCurrentUser = (token) => {
		return axios({
			method: "POST",
			url: baseURL + "/user/profile",
			headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				setUserData(res.data.body);

			})
			.catch((error) => {
				console.log(error);
			});
	};

    const handleSubmit = async (e) => {   
		e.preventDefault();
		await login(email, password)
			.then((res) => {
				console.log("ok")
				setUserToken(res.data.body.token)
				return res.data.body.token
			})
			.then((token) => {
				getCurrentUser(token)
				setIsLoggedIn(true)

			})
			.catch((err) => {
				console.log(err)
				setIsLoggedIn(false)
		});
    }

	// TODO : fetch userdATA after login and update context

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
					<input type="checkbox" id="remember-me" />
					<label htmlFor="remember-me">Remember me</label>
				</div>
				<button type='submit' className='sign-in-button'>
					Sign in
				</button>
				{/* <!-- PLACEHOLDER DUE TO STATIC SITE -->
				<a href="./user.html" className="sign-in-button">Sign In</a>
				<!-- SHOULD BE THE BUTTON BELOW -->
				<!-- <button className="sign-in-button">Sign In</button> -->
				<!--  --> */}
				</form>
			</section>
		</main>
  )
}
