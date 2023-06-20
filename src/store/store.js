import { configureStore } from "@reduxjs/toolkit";
import { loginReducers } from "./login";
import { personalDocReducers } from "./personalDoc";
import { profileReducers } from "./profile";
import {quotesReducers} from "./quotes";

export const store = configureStore({
    reducer: {
        login: loginReducers,
        personalDoc: personalDocReducers,
        profile: profileReducers,
        quotes: quotesReducers
    }
});


