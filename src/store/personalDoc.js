import { createSlice } from "@reduxjs/toolkit";
const intialstore  = {personalDoc:[],inistialized:false,sending:false,loading:false};
const personalDocSlice = createSlice({
    name: "personalDoc",
    initialState: {personalDoc:[],inistialized:false,sending:false,loading:false},
    reducers: {
        setpersonalDoc: (state,action) => {
            state.personalDoc = action.payload;
        },
        setinistialized: (state) => {
            state.inistialized = true;
        },
        setsending:(state,action) => {
            state.sending = action.payload;
        },
        setloading:(state,action) => {
            state.loading = action.payload;
        },
        reset: () => intialstore
    }
});

export const personalDocActions = personalDocSlice.actions;
export const personalDocReducers = personalDocSlice.reducer;