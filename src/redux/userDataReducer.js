import { userActionTypes } from "./actions";

const initialState = {
    userData: {}
}

export const userDataReducer = (state=initialState, action) => {

    switch(action.type) {
        case userActionTypes.FETCH_USER_DATA_SUCCESS:
            return {
                ...state,
                userData: action.payload.userData
            };
        case userActionTypes.FETCH_USER_DATA_FAIL:
            return state;
        case userActionTypes.UPDATE_USER_DATA_SUCCESS:
            return {
                ...state,
                userData: action.payload.userData
            };
        case userActionTypes.UPDATE_USER_DATA_FAIL:
            return state;
        default:
            return state;
    }

}

