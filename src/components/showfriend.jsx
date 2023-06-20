import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import {  db } from "../firebase";
import { setDoc,doc } from "firebase/firestore";
import { profileActions } from "../store/profile";
import { getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { quotesActions } from "../store/quotes";


export const ShowFriend = (props) => {
    const {friend} = props;
    const [frienddoc, setfrienddoc] = React.useState({});
    console.log(friend);
    const dispatch = useDispatch();
    const friends = useSelector(state => state.profile.friends)
    const authcred = useSelector(state => state.login.authcred)
    useEffect(() => {
        const frienddoc = async() => {
            const docSnap = await getDoc(doc(db, "users", friend));
            if (docSnap.exists()) {
                setfrienddoc(docSnap.data());
            } else {
                console.log("No such document!");
            }
        }
        frienddoc();
    },[]);
    const removefriend = () => {
        if(friends.connection.includes(friend)){
            const newFriends = friends.connection.filter((item) => item !== friend);
            dispatch(profileActions.setfriends({id:friends.id,connection:newFriends}));
            const removefriendDoc = async() => {
                await setDoc(doc(db, "friends",authcred.uid), {connection:newFriends});
            }
            removefriendDoc();
        }
        dispatch(profileActions.setfisInitialised(false))
        dispatch(quotesActions.setinistialized(false))
    }
    const navigate = useNavigate();
    const tohisquotes = () => {
        navigate(`/profile/friends/${friend}`);
    }
    return (
        <div class="card mt-2">
            <div class="card-body firendsinfriends">
                <div className="friend-info">
                    <img src={frienddoc.profileURL} className="friendprofilepic"/>
                    <p>{frienddoc.name}</p>
                </div>
                <div>
                    <button className="btn btn-info remove" style={{color:"white"}} onClick={tohisquotes}>quotes</button>
                    <button className="btn btn-outline-danger remove" onClick={removefriend}>remove</button>
                </div>
                
            </div>
        </div>
        
    )
};