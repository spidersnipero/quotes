import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
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
            } else {
                console.log("No such document!");
            }
        }
        getprofile();
        const getQuotes = async() => {
            console.log(id);
            const q = query(collection(db, "personalquotes"), where("email", "==", id));
            const querySnapshot = await getDocs(q);
            const data = [];
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                data.push(doc.data());
            });
            setiquotes(data);
        }
        getQuotes();
        setisdone(true);
    },[])
    const logquotes = () => {
        console.log(iquotes);
    }
    return <>
        {!isdone && <p>loading..</p>}
        {isdone && 
        <>
        <div className="profile container">
            <div className="profilehead">
            <h1>Profile</h1>
            </div>
            <img className="profilepic" src={iprofile.profileURL}/>
            <div className="profileinfo">
                <p className="profileusername">{iprofile.name}</p>
                <p className="profileemail">{iprofile.email}</p>
            </div>
        </div>
        <div className="container mt-5">
            <h2 onClick={logquotes}>Their quotes</h2>
            {iquotes.length!=0 &&iquotes.map((item) => {
                return <div className="card mt-2">
                    <div className="card-body">
                        <p>" {item.quote} "</p>
                        <p>{item.date.day}/{item.date.month}/{item.date.year}</p>
                    </div>
                </div>
            })}
            {!isdone && <p>loading ...</p>}
            {iquotes.length==0 && isdone && <p>no quotes</p>}
        </div>
        </>
        }
        </>
}