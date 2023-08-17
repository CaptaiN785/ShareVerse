import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    detail: null
}

export const serversSlice = createSlice({
    name:'servers',
    initialState,
    reducers:{
        setServersDetail: (state, action) => {
            state.detail = action.payload;
        }
    }
})

export const {setServersDetail} = serversSlice.actions;
export default serversSlice.reducer;