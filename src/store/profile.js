import { createSlice } from "@reduxjs/toolkit";
const intialstore = {profile:{name:""},friends:{id:"",connection:[]},pisInitialised:false,fisInitialised:false};

const profileSlice = createSlice({
    name: "profile",
    initialState: {profile:{name:""},friends:{id:"",connection:[]},pisInitialised:false,fisInitialised:false},
    reducers: {
        setprofile: (state,action) => {
            state.profile = action.payload;
        },
        setfriends: (state,action) => {
            state.friends = action.payload;
            state.fisInitialised = true;
        },
        setisInitialised: (state,action) => {
            state.pisInitialised = action.payload;
        },
        setfisInitialised: (state,action) => {
            state.fisInitialised = action.payload;
        },
        reset: () => intialstore
        
    }
});

export const profileActions = profileSlice.actions;
export const profileReducers = profileSlice.reducer;