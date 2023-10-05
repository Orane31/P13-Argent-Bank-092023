// import { createStore } from "https://cdn.skypack.dev/redux@4.0.5";
import { createStore, combineReducers } from "redux";
import { loginReducer } from "../redux/loginReducer";
import { userDataReducer } from "../redux/userDataReducer";

//  TODO : combiner les 2 reducers dans root reducer
const rootReducer = combineReducers({
    loginStore: loginReducer,
    userDataStore: userDataReducer,
})


export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// const state = store.getState()