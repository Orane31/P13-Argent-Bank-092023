
export const authActionTypes = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL'
}

export const userActionTypes = {
    FETCH_USER_DATA_SUCCESS: 'FETCH_USER_DATA_SUCCESS',
    FETCH_USER_DATA_FAIL: 'FETCH_USER_DATA_FAIL',
    UPDATE_USER_DATA_SUCCESS: 'UPDATE_USER_DATA_SUCCESS',
    UPDATE_USER_DATA_FAIL: 'UPDATE_USER_DATA_FAIL'
}

export const loginActionSuccessCreator = (userToken, isLoggedIn) => ({
    type: authActionTypes.LOGIN_SUCCESS,
    payload: { userToken, isLoggedIn },
})
export const loginActionFailCreator = (error) => ({
    type: authActionTypes.LOGIN_FAIL,
    payload: { error },
})

export const fetchUserDataSuccessActionCreator = (userData) => ({
    type: userActionTypes.FETCH_USER_DATA_SUCCESS,
    payload: { userData },
})
export const fetchUserDataFailureActionCreator = () => ({
    type: userActionTypes.FETCH_USER_DATA_FAIL,
})

export const updateUserDataSuccessCreator = (userData) => ({
    type: userActionTypes.UPDATE_USER_DATA_SUCCESS,
    payload: { userData },
})
export const updateUserDataFailureCreator = () => ({
    type: userActionTypes.UPDATE_USER_DATA_FAIL,
})


