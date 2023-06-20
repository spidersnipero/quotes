import React from "react";
import { useDispatch,useSelector } from "react-redux";
import {  db } from "../firebase";
import { setDoc,doc } from "firebase/firestore";
import { profileActions } from "../store/profile";
import { quotesActions } from "../store/quotes";

export const FriendAdder = (props) => {
    const {friend} = props;
    const dispatch = useDispatch();
    const friends = useSelector(state => state.profile.friends)
    const authcred = useSelector(state => state.login.authcred)
    const addFriend = () => {
        console.log(friend.email);
        if(!friends.connection.includes(friend.email)){
            const newFriends = [...friends.connection,friend.email];
            dispatch(profileActions.setfriends({connection:newFriends}));
            const addfriendDoc = async() => {
                await setDoc(doc(db, "friends",authcred.uid), {connection:newFriends});
            }
            addfriendDoc();
        }
        dispatch(profileActions.setfisInitialised(false))
        dispatch(quotesActions.setinistialized(false))

    }
    return (
        <div class="card friendadder">
            <div class="card-body firendsinfriends">
                <div className="friend-info">
                    <img src={friend.profileURL} className="friendprofilepic"/>
                    <div>
                        <p>{friend.name}</p>
                        <p>{friend.email}</p>
                    </div>
                </div>
                {!friends.connection.includes(friend.email) && <button className="btn btn-success add" onClick={addFriend}>add</button>}
            </div>
        </div>
    )
}