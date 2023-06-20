import {React, useEffect} from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { collection, getDocs,doc,query, where, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { quotesActions } from "../store/quotes";
import { HomeQuoteShower } from "./quoteshowers/homequoteshower";


export const TodayQuotes = () => {
    const quotes = useSelector(state => state.quotes.quotes);
    const dispatch = useDispatch();
    const friends = useSelector(state => state.profile.friends);
    const isinistialized = useSelector(state => state.quotes.inistialized);
    const gettodayquotes =  () => {
        dispatch(quotesActions.clearqoutes());
        const date = {
            day : new Date().getDate(),
            month : new Date().getMonth(),
            year : new Date().getFullYear()
        }
        friends.connection.forEach(async (friend) => {
            const userdoc = await getDoc(doc(db,"users",friend));
            const q = query(collection(db,"personalquotes"),where("date.day","==",date.day),
                where("date.month","==",date.month),where("date.year","==",date.year),where("email","==",friend));
            const querySnapshot = await getDocs(q);
            if(!querySnapshot.empty){
                querySnapshot.forEach((doc) => {
                    dispatch(quotesActions.addquote({...doc.data(),author : userdoc.data()}));
                })
            }
        })
        dispatch(quotesActions.setinistialized(true));
    };
    useEffect(() => {
        if(!isinistialized ){
            gettodayquotes();
        }
    },[]);
    return (
        <div className="container ">
        {!isinistialized && <img src="https://cdn.dribbble.com/users/1186261/screenshots/3718681/_______.gif"
                 alt="just" style={{height:"10rem"}} />}
        {quotes.map((quote) => {
            return (
                <HomeQuoteShower quote={quote} />
            )
        })}
        {isinistialized && quotes.length===0 && <h5>no quotes today</h5>}
        </div>
    )
}