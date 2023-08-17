import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token : localStorage.getItem("token") ? localStorage.getItem("token") : null,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setToken: (state, action) => {
            state.token = action.payload
        },
        setUser:  (state, action) => {
            state.user = action.payload;
        },
        revokeToken: (state) => {
            state.token = null;
            localStorage.removeItem("token");
        },
        removeUser: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        }
    }
})

export const {setToken, revokeToken, setUser, removeUser} = authSlice.actions
export default authSlice.reducer