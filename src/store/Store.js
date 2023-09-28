import { createStore } from "https://cdn.skypack.dev/redux@4.0.5";

const initialState = {
    userToken: '',
    userData: {}
}

// ACTIONS

const userActionTypes = {
    fetchUserDataStart: 'fetchUserDataStart',
    fetchUserDataSuccess: 'fetchUserDataSuccess',
    fetchUserDataFailure:'fetchUserDataFailure'
}

const fetchUserDataActionCreator = (userToken) => ({
        type: userActionTypes.fetchUserDataStart,
        payload: { userToken: userToken },
})

const fetchUserDataSuccessActionCreator = (userData) => ({
    type: userActionTypes.fetchUserDataSuccess,
    payload: { userData },
})

const fetchUserDataFailureActionCreator = () => ({
    type: userActionTypes.fetchUserDataFailure,
})


//  REDUCER

function userDataReducer(state=initialState, action) {
    // switch case au lieu de if
    if (action.type === userActionTypes.fetchUserDataStart) {
        console.log('start')
        return { 
            ...state,
            // Ici on ajouterait un flag isLoading
        }
    }
    if (action.type === userActionTypes.fetchUserDataSuccess) {
        return {
            ...state,
            userData: action.payload.userData
        }
    }
    if (action.type === userActionTypes.fetchUserDataFailure) {
        return state;
    }
    return state;
}


export const store = createStore(userDataReducer, initialState)

// const state = store.getState()