import { authActionTypes} from "./actions"

const initialState = {
    isLoggedIn: false,
    userToken: '',
}

export const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case authActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                userToken: action.payload.userToken,
                isLoggedIn: true
            }
        case authActionTypes.LOGIN_FAIL:
            return {
                ...state,
                userToken: null,
                isLoggedIn:false,
                error: action.payload.error
            }
        case authActionTypes.LOGOUT:
            return {
                ...state,
                userToken: null,
                isLoggedIn: false
            }
        default:
            return state
    }
}