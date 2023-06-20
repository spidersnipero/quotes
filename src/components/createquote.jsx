import React from "react";
import { collection,addDoc} from "firebase/firestore";
import { db } from "../firebase";
import { useSelector,useDispatch } from "react-redux";
import { personalDocActions } from "../store/personalDoc";
import { useNavigate } from "react-router-dom";

export const Createquote = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector(state => state.personalDoc.sending);
    const [quote,setQuote] = React.useState("");
    const authcred = useSelector(state => state.login.authcred)
    const personalDoc = useSelector(state => state.personalDoc.personalDoc)
    const handelChange = (e) => {
        setQuote(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(personalDocActions.setsending(true));
        const docRef = collection(db,"personalquotes");
        const data = {
            time :  Date.now(),
            uid : authcred.uid,
            quote,
            date:{
                day : new Date().getDate(),
                month : new Date().getMonth(),
                year : new Date().getFullYear()
            },
            email: authcred.email,
        }
        await addDoc(docRef,data) ;
        dispatch(personalDocActions.setpersonalDoc([...personalDoc,data]));
        dispatch(personalDocActions.setsending(false));
        navigate("/myqoutes");
    }
    return (
        <div className="container">
            {status && <center><img src="https://cdn.dribbble.com/users/1186261/screenshots/3718681/_______.gif"
                 alt="just" style={{height:"5rem"}} /></center>}
            <h1>Create Quote</h1>
            <form className="form-group" onSubmit={handleSubmit}>
                <textarea type="text" onChange={handelChange}  className="form-control m-2" placeholder="Quote" />
                <button className="btn btn-primary m-2">Submit</button>
            </form> 
        </div>
           
    )
}