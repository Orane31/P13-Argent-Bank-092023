import React from 'react'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { Context } from '../context/Context'
import UserForm from '../components/UserForm'
// import { useFetch } from '../services/useFetch'
import AccountCard from '../components/AccountCard'
import { updateUserDataSuccessCreator } from '../redux/actions'

export default function Profile() {

    const [showUserForm, setShowUserForm] = useState(false)
	//  enlever les setters ci dessous

	//  à chaque setState -> remplacer par dispatch
	const baseURL = "http://localhost:3001/api/v1"
	const { userToken, isLoggedIn } = useSelector((state) => state.loginStore)
	const { userData } = useSelector((state) => state.userDataStore)
    const [newFirstName, setNewFirstName] = useState(userData.firstName)
    const [newLastName, setNewLastName] = useState(userData.lastName)
	const dispatch = useDispatch()

    let navigate = useNavigate()

    const handleSubmit = async (event) => {
		event.preventDefault();
		updateName(newFirstName, newLastName);
		setShowUserForm(false);
	};

	const toggleUserForm = () => {
		if (showUserForm) {
			setShowUserForm(false);
		} else {
			setShowUserForm(true);
		}
	};

	const updateName = (firstName, lastName) => {
		axios({
			method: "PUT",
			url: baseURL + "/user/profile",
			headers: { Authorization: `Bearer ${userToken}` },
			data: {
				firstName: firstName,
				lastName: lastName,
			},
			})
			.then((res) => {
				// setUserData(res.data.body);
				dispatch(updateUserDataSuccessCreator(res.data.body))
				// dispatch(action)
			})
			.catch((error) => {
				console.log(error);
			});
	};

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        }
    }, []);


	useEffect(() => {
		console.log(userData)
	}, [userData])

    if (!userData) {
        return null;
    }

    return (
        <main className='main bg-dark'>
            <div className='header'>
                <h1>Welcome back<br/>{userData.firstName} {userData.lastName} !</h1>

                {!showUserForm && (
                    
                <button className='edit-button' onClick={toggleUserForm}>Edit</button>
                )}
            </div>
            {showUserForm && (
					<form className="new-name-form" onSubmit={handleSubmit}>
						<div className="input-group">
							<div className="input-wrapper">
								<label className="hidden" htmlFor="firstname">
									Firstname
								</label>
								<input type="text" id="firstname" onChange={(e) => setNewFirstName(e.target.value)} value={newFirstName} />
							</div>
							<div className="input-wrapper">
								<label className="hidden" htmlFor="lastname">
									Lastname
								</label>
								<input type="text" id="lastname" onChange={(e) => setNewLastName(e.target.value)} value={newLastName} />
							</div>
						</div>
						<div className="input-group">
							<button type="submit" className="edit-button">
								Save
							</button>
							<button className="edit-button" onClick={toggleUserForm}>
								Cancel
							</button>
						</div>
					</form>
				)}
            <h2 className='sr-only'>Accounts</h2>

            <AccountCard
                    title=">Argent Bank Checking (x8349)"
                    amount="$2,082.79"
                    description="Available Balance"
                />
            <AccountCard
                title="Argent Bank Savings (x6712)"
                amount="$10,928.42"
                description="Available Balance"
                />
            <AccountCard
                title="Argent Bank Credit Card (x8349)"
                amount="$184.30"
                description="Available Balance"
                />
        </main>
  )
}
