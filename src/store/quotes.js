import { createSlice } from "@reduxjs/toolkit";
const intialstore = {quotes:[],inistialized:false}

const quotesSlice = createSlice({
    name: "quotes",
    initialState: {quotes:[],inistialized:false},
    reducers: {
        addquote: (state,action) => {
            const n = []
            state.quotes.forEach((quote) => {
                if(quote.time !== action.payload.time){
                    n.push(quote);
                }
            });
            state.quotes = n;
            state.quotes.push(action.payload);
        },
        clearqoutes: (state) => {
            state.quotes = [];
        }
        ,
        setinistialized: (state,action) => {
            state.inistialized = action.payload;
        },
        reset: (state) => intialstore
    }
});
export const quotesActions = quotesSlice.actions;
export const quotesReducers = quotesSlice.reducer;