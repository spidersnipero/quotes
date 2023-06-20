import React, { useEffect } from "react";
import {useSelector } from "react-redux";
import { db } from "../firebase";
import { collection, getDocs,where,query } from "firebase/firestore";
import {FriendAdder} from "./friendadder.jsx";
import { ShowFriend } from "./showfriend";
import  {useNavigate } from "react-router-dom";

export const Friends = () => {
    const navigate = useNavigate();
    const [isfinds, setisfinds] = React.useState(false);
    const fisInitialised = useSelector(state => state.profile.fisInitialised);
    console.log(fisInitialised);
    useEffect(() => {
    if(!fisInitialised){
        console.log("not initialised");
        navigate("/");
    }},[]);
    const [finds, setfinds] = React.useState([]);
    const friends = useSelector(state => state.profile.friends)
    const profile = useSelector(state => state.profile.profile)
    const handelChange = async(e) => {
        setisfinds(true);
        if(e.target.value !== ""){
            const q  = query(collection(db, "users"), where("email", ">=", e.target.value),where("email", "<", e.target.value+"\uf8ff"));
            const docSnap = await getDocs(q);
            if (docSnap.empty) {
                setfinds([])
                return;
            }else{
                const data = docSnap.docs.map((doc) => {
                    return( {  ...doc.data() });
                })
                const n = [];
                data.forEach((d) => {
                    if(d.email !== profile.email){
                        n.push(d);
                    }
                })
                setfinds(n.slice(0,10));
            }
        }
        else{
            setfinds([]);
            setisfinds(false);
        }   
    }
    

    return (
       <div className="container" >
            <h2 style={{fontWeight:"300"}}>Connections</h2>
            {friends.connection.map((friend) => {
                return (
                    <ShowFriend friend={friend}/>
                )
            })}
            {friends.connection.length === 0 && <p>you have no connections curently</p>}
            <form className="form-group form mt-3">
                <input className="form-control" onChange={handelChange} type="text" placeholder="Find a friend" />
            </form>
            <div className="friendshower">
                {finds.map((friend) => {
                    return (
                        <FriendAdder friend={friend}/>
                    )
                })}
                {isfinds &&finds.length==0 && <p className="mt-3">no results found</p>}
            </div>
        </div>
    )
}