import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { profileActions } from "../store/profile.js";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile.profile)
    const navigate = useNavigate();
    const fisInitialised = useSelector(state => state.profile.fisInitialised);
    if(!fisInitialised){
        navigate("/");
    }
    if(localStorage.getItem("quotesprofile") !== null){
        const user = JSON.parse(localStorage.getItem("quotesprofile"));
        if(profile.name === ""){
            const p = {
                name:user.name,
                email:user.email,
                profileURL:user.profileURL,
            }
            dispatch(profileActions.setprofile(p));
        }
    }
    return (
        <div className="container profile">
            <div className="profilehead">
            <h2 style={{fontWeight:"400"}}>Profile</h2>
            <Link className="btn btn-outline-primary"  to="/profile/friends">My friends 🔍</Link>
            </div>
            <img className="profilepic" src={profile.profileURL}/>
            <div className="profileinfo">
                <p className="profileusername">{profile.name}</p>
                <p className="profileemail">{profile.email}</p>
            </div>
        </div>
    )
}
