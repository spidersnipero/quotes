import { signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../firebase.js";
import { useDispatch } from "react-redux";
import { loginActions } from "../store/login";
import { setDoc,doc,getDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { profileActions } from "../store/profile.js";


export function Login() {
    const dispatch = useDispatch();
    const handelsignin = () => {
    localStorage.setItem("quoteAuth",true);
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        localStorage.setItem("qouteUser",JSON.stringify(user));
        const data  ={
            name: user.displayName,
            email: user.email,
            profileURL: user.photoURL,
        }
        const setProflie= async()=>{
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                dispatch(profileActions.setprofile(docSnap.data()));
                console.log("Document data:", docSnap.data());
            } 
            else {
                await setDoc(doc(db, "users", user.email), data);
                dispatch(profileActions.setprofile(data));
            }
        }
        setProflie();
        dispatch(loginActions.login())
        dispatch(loginActions.setauthcred((user)));
    }).catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
    }
    return (
        <div className="login container mt-5">
        <h1>Quote everyday </h1>
        <h3>and embrace your passion of sharing </h3>
        <button className="mt-3 btn btn-lg signin" onClick={handelsignin}>Sign In</button>
        </div>
    );
}
