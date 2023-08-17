import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../slicers/auth"
import otpReducer from "../slicers/otp";
import serversReducer from "../slicers/servers"
import currentServerReducer from "../slicers/currentServer"

export const store = configureStore({
    reducer:{
        auth: authReducer,
        otp: otpReducer,
        servers: serversReducer,
        currentServer:currentServerReducer
    }
})