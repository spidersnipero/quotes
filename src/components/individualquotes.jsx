import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDoc,doc,getDocs } from "firebase/firestore";

export function IndividualQuotes() {
    const [iprofile,setiprofile] = React.useState({});
    const [iquotes, setiquotes] = React.useState([]);
    const [isdone, setisdone] = React.useState(false);
    const { id } = useParams();
    useEffect(() => {
        const getprofile = async() => {
            const docSnap = await getDoc(doc(db, "users", id));
            if (docSnap.exists()) {
                setiprofile(docSnap.data());
            } 
        }
        getprofile();
        const getQuotes = async() => {
            const q = query(collection(db, "personalquotes"), where("email", "==", id));
            const querySnapshot = await getDocs(q);
            const data = [];
            querySnapshot.forEach((doc) => {

                data.push(doc.data());
            });
            setiquotes(data);
        }
        getQuotes();
        setisdone(true);
    },[])
    return <>
        {!isdone && <p>loading..</p>}
        {isdone && 
        <>
        <div className="profile container">
            <div className="profilehead">
            <h1>Profile</h1>
            </div>
            <img className="profilepic" alt="profilepic" src={iprofile.profileURL}/>
            <div className="profileinfo">
                <p className="profileusername">{iprofile.name}</p>
                <p className="profileemail">{iprofile.email}</p>
            </div>
        </div>
        <div className="container mt-5">
            <h2 >Their quotes</h2>
            {iquotes.length!==0 &&iquotes.map((item) => {
                return <div className="card mt-2">
                    <div className="card-body">
                        <p>" {item.quote} "</p>
                        <p>{item.date.day}/{item.date.month}/{item.date.year}</p>
                    </div>
                </div>
            })}
            {!isdone && <img src="https://cdn.dribbble.com/users/1186261/screenshots/3718681/_______.gif"
                 alt="just" style={{height:"10rem"}} />}
            {iquotes.length===0 && isdone && <p>no quotes</p>}
        </div>
        </>
        }
        </>
}