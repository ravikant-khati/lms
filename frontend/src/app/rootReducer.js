import { combineReducers } from "@reduxjs/toolkit"
import { authAPIs } from "../features/apis/authAPI"
import authReducer from '../features/authSlice.js'
import { courseAPIs } from "../features/apis/courseAPI.js"
import { lectureAPIs } from "../features/apis/lectureAPI.js"
import { mediaAPIs } from "../features/apis/mediaAPI.js"
import { purchaseAPIs } from "../features/apis/coursePurchaseAPI.js"
import { progressAPIs } from "../features/apis/progressAPI.js"
const rootReducer = combineReducers({
    [authAPIs.reducerPath]:authAPIs.reducer,
    [courseAPIs.reducerPath]:courseAPIs.reducer,
    [lectureAPIs.reducerPath]:lectureAPIs.reducer,
    [mediaAPIs.reducerPath]:mediaAPIs.reducer,
    [purchaseAPIs.reducerPath]:purchaseAPIs.reducer,
    [progressAPIs.reducerPath]:progressAPIs.reducer,
    auth:authReducer
})
export default rootReducer