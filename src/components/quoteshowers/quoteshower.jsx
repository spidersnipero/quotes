import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { personalDocActions } from "../../store/personalDoc";
import { db } from "../../firebase";
import { getDocs,collection,query, where,deleteDoc,doc } from "firebase/firestore";

export const QuoteShower =(e)=>{
    const dispatch = useDispatch();
    const personalDoc = useSelector(state => state.personalDoc.personalDoc);
    const {quote} = e;
    const remove = async() => {
        const newpersonalDoc = personalDoc.filter(e => e.time!=quote.time);
        dispatch(personalDocActions.setpersonalDoc(newpersonalDoc));
        const docremover =async()=>{
            const q = query(collection(db,"personalquotes"),where("time","==",quote.time),where("uid","==",quote.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async(d) => {
                await deleteDoc(doc(db,"personalquotes",d.id));
            });
        }
        docremover();
    }
    return(
        <div className="container mt-3">
            <div className="card">
                <div className="card-body quoteflexer">
                    <div>
                        <p>" {quote.quote} "</p>
                        <span className="date">{quote.date.day}/{quote.date.month}/{quote.date.year}</span>
                    </div>
                    <button className="btn btn-danger remover" onClick={remove}>Avada Kedavra</button>
                </div>
            </div>
        </div>
    )
}