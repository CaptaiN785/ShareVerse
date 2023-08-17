import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null
}

export const otpSlice = createSlice({
    name:'otp',
    initialState,
    reducers:{
        setOTP : (state, action) => {
            state.value = action.payload
        }
    }
})

export const {setOTP} = otpSlice.actions;
export default otpSlice.reducer;