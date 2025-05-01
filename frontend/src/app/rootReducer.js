import { combineReducers } from "@reduxjs/toolkit"
import { authAPIs } from "../features/apis/authAPI"
import authReducer from '../features/authSlice.js'
const rootReducer = combineReducers({
    [authAPIs.reducerPath]:authAPIs.reducer,
    auth:authReducer
})
export default rootReducer