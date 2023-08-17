import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : null
}

export const currentServer = createSlice({
    name:'currentServer',
    initialState,
    reducers:{
        setCurrentServer: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setCurrentServer} = currentServer.actions;
export default currentServer.reducer;