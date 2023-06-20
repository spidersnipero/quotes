import React, { useEffect } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSelector ,useDispatch} from "react-redux";
import { personalDocActions } from "../store/personalDoc";
import { QuoteShower } from "./quoteshowers/quoteshower";

export const MyQuotes = () => {
    const personalDoc = useSelector(state => state.personalDoc.personalDoc)
    const inistialized = useSelector(state => state.personalDoc.inistialized)
    console.log("inistialized");
    console.log(inistialized);
    const loading = useSelector(state => state.personalDoc.loading)
    const dispatch = useDispatch();
    const authcred = useSelector(state => state.login.authcred)
    console.log(authcred);
    const getdocs = async () => {
        if(authcred.uid){
            dispatch(personalDocActions.setloading(true));
            const q = query(collection(db, "personalquotes"), where("uid", "==", authcred.uid));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                dispatch(personalDocActions.setloading(false));
                return;
            }
            const data = querySnapshot.docs.map((doc) => {
            return( {  ...doc.data() });
            })
            dispatch(personalDocActions.setpersonalDoc(data));
            dispatch(personalDocActions.setloading(false));
        }else{return;}
        dispatch(personalDocActions.setinistialized());
    }
    useEffect(() => {
        if(!inistialized){
            console.log("getdocs");
            getdocs();
        }
    },[]);

    return (
        <div className="container yourquotes">
            <h1 className="btn btn-lg">Your Quotes</h1>
            {personalDoc.length==0 && !loading&& <p>you have no quotes</p>}
            {loading && <img src="https://cdn.dribbble.com/users/1186261/screenshots/3718681/_______.gif"
                 alt="just" style={{height:"10rem"}} />}
            {personalDoc.map((doc) => {
                return (
                    <div key={doc.id}>
                        <QuoteShower quote={doc}/>
                    </div>
                )
            })}
        </div>
    )
}
