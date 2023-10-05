import React from 'react'
import axios from 'axios'

export const getCurrentUser = (token) => {

    const baseURL = "http://localhost:3001/api/v1"

    return axios({
        method: "POST",
        url: baseURL + "/user/profile",
        headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            return res.data.body
            // remplace with : useDispatch ( action success avec res.data.body en param)
            // dispatch(fetchUserDataSuccessActionCreator(res.data.body))
            // setUserData(res.data.body);

        })
        .catch((error) => {
            console.log(error);
        });
};
