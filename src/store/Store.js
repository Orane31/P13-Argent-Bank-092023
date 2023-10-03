import { createStore } from "https://cdn.skypack.dev/redux@4.0.5";

const initialState = {
    userToken: '',
    userData: {}
}

// ACTIONS

const userActionTypes = {
    fetchUserDataStart: 'fetchUserDataStart',
    fetchUserDataSuccess: 'fetchUserDataSuccess',
    fetchUserDataFailure:'fetchUserDataFailure',
    updateUserDataStart: 'updateUserDataStart',
    updateUserDataSuccess: 'updateUserDataSuccess',
    updateUserDataFailure: 'updateUserDataFailure' 
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

const updateUserDataStartCreator = (userToken) => ({
    type: userActionTypes.updateUserDataStart,
    payload: { userToken: userToken },
})
const updateUserDataSuccessCreator = (userData) => ({
    type: userActionTypes.updateUserDataSuccess,
    payload: { userData },
})
const updateUserDataFailureCreator = () => ({
    type: userActionTypes.updateUserDataFailure,
})

//  REDUCER

function userDataReducer(state=initialState, action) {
    // switch case au lieu de if
    switch(action.type) {
        case userActionTypes.fetchUserDataStart:
            return {
                ...state,
                // Here we'd add flag is loading
            };
        case userActionTypes.fetchUserDataStart:
            return {
                ...state,
                userData: action.payload.userData
            };
        case userActionTypes.fetchUserDataFailure:
            return state;
        default:
            return state;
    }
    // if (action.type === userActionTypes.fetchUserDataStart) {
    //     console.log('start')
    //     return { 
    //         ...state,
    //         // Ici on ajouterait un flag isLoading
    //     }
    // }
    // if (action.type === userActionTypes.fetchUserDataSuccess) {
    //     return {
    //         ...state,
    //         userData: action.payload.userData
    //     }
    // }
    // if (action.type === userActionTypes.fetchUserDataFailure) {
    //     return state;
    // }
    // return state;
}

// function userUpdateReducer(state=initialState, action) {

// }


export const store = createStore(userDataReducer, initialState)

// const state = store.getState()