import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.js";
import { authAPIs } from "../features/apis/authAPI.js";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (dm) => dm().concat(authAPIs.middleware),
});


const initializeApp = async () => {
  await appStore.dispatch(authAPIs.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();