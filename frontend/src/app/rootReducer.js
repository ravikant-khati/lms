import { combineReducers } from "@reduxjs/toolkit"
import { authAPIs } from "../features/apis/authAPI"
import authReducer from '../features/authSlice.js'
import { courseAPIs } from "../features/apis/courseAPI.js"
import { lectureAPIs } from "../features/apis/lectureAPI.js"
import { mediaAPIs } from "../features/apis/mediaAPI.js"
const rootReducer = combineReducers({
    [authAPIs.reducerPath]:authAPIs.reducer,
    [courseAPIs.reducerPath]:courseAPIs.reducer,
    [lectureAPIs.reducerPath]:lectureAPIs.reducer,
    [mediaAPIs.reducerPath]:mediaAPIs.reducer,
    auth:authReducer
})
export default rootReducer