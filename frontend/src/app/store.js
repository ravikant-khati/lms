import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.js";
import { authAPIs } from "../features/apis/authAPI.js";
import { courseAPIs } from "../features/apis/courseAPI.js";
import { lectureAPIs } from "../features/apis/lectureAPI.js";
import { mediaAPIs } from "../features/apis/mediaAPI.js";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (dm) => dm().concat(authAPIs.middleware , courseAPIs.middleware , lectureAPIs.middleware, mediaAPIs.middleware

  ),
});


const initializeApp = async () => {
  await appStore.dispatch(authAPIs.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();
