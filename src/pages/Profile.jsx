import React from 'react'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../context/Context'
import UserForm from '../components/UserForm'
// import { useFetch } from '../services/useFetch'
import AccountCard from '../components/AccountCard'

export default function Profile() {

    const [newFirstName, setNewFirstName] = useState(null)
    const [newLastName, setNewLastName] = useState(null)
    const [showUserForm, setShowUserForm] = useState(false)
    const { userToken, baseURL, isLoggedIn, userData, setUserData } = useContext(Context);

    let navigate = useNavigate()

    const handleSubmit = async (event) => {
		event.preventDefault();
		newName(newFirstName, newLastName);
		currentUser(userToken);
		setShowUserForm(false);
	};

	const toggleUserForm = () => {
		if (showUserForm) {
			setShowUserForm(false);
		} else {
			setShowUserForm(true);
		}
	};

	const currentUser = (token) => {
		axios({
			method: "POST",
			url: baseURL + "/user/profile",
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((res) => {
				setUserData(res.data.body);
				setNewFirstName(res.data.body.firstName);
				setNewLastName(res.data.body.lastName);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const newName = (firstName, lastName) => {
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
				console.log(res);
			})
			.catch((error) => {
				console.log(error);
			});
	};

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        }
        
    //     const user = (token) => {
    //         axios({
    //             method: "POST",
    //             url: baseURL + "/user/profile",
    //             headers: { Authorization: `Bearer ${token}` },
    //         })
    //         .then((res) => {
    //             // setFirstName(res.data.body.firstName) 
    //             // setLastName(res.data.body.lastName)
    //             setUserData(res.data.body)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         });
        
    //     }
        currentUser(userToken);
    }, []);

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
