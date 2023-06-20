import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { loginActions } from "../store/login";
import { personalDocActions } from "../store/personalDoc";
import { quotesActions } from "../store/quotes";
import { profileActions } from "../store/profile";



export const Navbar = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const handleLogout=  async ()=> {
        const res = signOut;
        console.log(res);
        localStorage.setItem("quoteAuth",false);
        localStorage.removeItem("qouteUser");
        localStorage.removeItem("quotesprofile");
        dispatch(loginActions.reset())
        dispatch(quotesActions.reset());
        dispatch(personalDocActions.reset());
        dispatch(profileActions.reset());
        nav("/")
    }
    const handleProfile = () => {
        nav("/profile")
    }
    const handleQuote = () => {
        nav("/createquote")
    }
    const handleMyQuote = () => {
        nav("/myqoutes")
    }
    const homer = () => {
        nav("/")
    }
    const auth = useSelector(state => state.login.auth)
    return (
    <nav class="navbar navbar-light bg-light navver ">
    <div class="container-fluid">
        <h1 class="navbar-brand mb-0 btn navlogo" onClick={homer}>Quotes</h1>
        {auth && <div>
            <p class="btn navbar-brand mb-0" onClick={handleLogout}>logout</p>
            <p class="btn navbar-brand mb-0" onClick={handleProfile}>profile</p>
            <p class="btn navbar-brand mb-0" onClick={handleQuote}>createQuote</p>
            <p class="btn navbar-brand mb-0" onClick={handleMyQuote}>myQuotes</p>
        </div>}
    </div>
    </nav>
    )
}