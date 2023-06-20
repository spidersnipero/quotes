import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {TodayQuotes} from "./todayquotes";
import { useSelector,useDispatch } from "react-redux";
import { setDoc,doc,getDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { profileActions } from "../store/profile.js";



export const Home = () => {
    const navigate = useNavigate();
    const profile = useSelector(state => state.profile.profile)
    const user = useSelector(state => state.login.authcred)
    const fisInitialised = useSelector(state => state.profile.fisInitialised)
    const dispatch = useDispatch();
    if(profile.name === ""){
        dispatch(profileActions.setprofile({name:user.displayName,email:user.email,profileURL:user.photoURL}));
        localStorage.setItem("quotesprofile",JSON.stringify({name:user.displayName,email:user.email,profileURL:user.photoURL}));
    }
    useEffect(() => {
        if(!fisInitialised ){
            const friendsData = {
                connection:[]
            }
            const getFriends= async()=>{
                const docSnap = await getDoc(doc(db,"friends", user.uid));
                if (docSnap.exists()) {
                    dispatch(profileActions.setfriends(docSnap.data()));
                } 
                else {
                    await setDoc(doc(db, "friends", user.uid), friendsData);
                    dispatch(profileActions.setfriends(friendsData));
                }
            }
            getFriends();
        }
    },[dispatch,fisInitialised,user.uid])
    const tocrequo = () => {
        navigate("/createquote");
    }
    return (
        <div className="container">
            <h1 style={{fontWeight:"400"}} >What's your quote of the day</h1>
            <h5 style={{fontWeight:"300"}}>Share your quote with the world</h5>
            <button className="btn btn-info mt-3" style={{color:"white"}} onClick={tocrequo}>feeling inspired</button>
            <div className="m-3">
                <h3 className="m-3" style={{fontWeight:"350"}}>Today's Quotes</h3>
                {!fisInitialised  &&  <img src="https://cdn.dribbble.com/users/1186261/screenshots/3718681/_______.gif"
                 alt="just" style={{height:"10rem"}} />
                }
                {fisInitialised  && <TodayQuotes />}
            </div>
        </div>
    )
}