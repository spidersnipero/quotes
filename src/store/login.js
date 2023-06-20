import { createSlice } from "@reduxjs/toolkit";
const intialstore = {auth:false,authcred:{}};
const loginSlice = createSlice({
    name: "login",
    initialState: {auth:false,authcred:{}},
    reducers: {
        login: (state) => {
            state.auth = true;
        },
        logout: (state) => {
            state.auth = false;
        },
        setauthcred : (state,action) => {
            state.authcred = action.payload;
        },
        reset: () => intialstore
    }
});

export const loginActions = loginSlice.actions;
export const loginReducers = loginSlice.reducer;

