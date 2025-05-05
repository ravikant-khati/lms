import { combineReducers } from "@reduxjs/toolkit"
import { authAPIs } from "../features/apis/authAPI"
import authReducer from '../features/authSlice.js'
import { courseAPIs } from "../features/apis/courseAPI.js"
const rootReducer = combineReducers({
    [authAPIs.reducerPath]:authAPIs.reducer,
    [courseAPIs.reducerPath]:courseAPIs.reducer,
    auth:authReducer
})
export default rootReducer