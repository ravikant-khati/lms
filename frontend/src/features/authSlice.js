import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    isAuthenticated:false
}
const authSliceFunction = createSlice({
    name:"authSlice",
    initialState,
    reducers:{
        userLoggedIn:(state, action)=>{
            state.user = action.payload.user;
            state.isAuthenticated= true;
        },
        userLoggedOut:(state)=>{
            state.user = null;  
            state.isAuthenticated= false
        }
    }
    
})
const {userLoggedIn , userLoggedOut} = authSliceFunction.actions
export {userLoggedIn , userLoggedOut}
export default authSliceFunction.reducer
