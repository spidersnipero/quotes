import { Route, Routes } from "react-router-dom"
import { Navbar } from "./components/navbar"
import { useSelector,useDispatch } from "react-redux"
import { Login } from "./components/login"
import { Profile } from "./components/profile"
import { Createquote } from "./components/createquote"
import { MyQuotes } from "./components/myquotes"
import { Home } from "./components/home"
import { Friends } from "./components/friends"
import { loginActions } from "../src/store/login";
import {IndividualQuotes} from "./components/individualquotes"
import { NotFound } from "./components/notfound"




export const App = () => {
  const auth = useSelector(state => state.login.auth)
  const dispatch = useDispatch();
  if(localStorage.getItem("quoteAuth") === "true" && localStorage.getItem("qouteUser")!=null) {
      console.log("login");
      dispatch(loginActions.setauthcred((JSON.parse(localStorage.getItem("qouteUser")))));
      dispatch(loginActions.login())
  }
  return(
    <>
    <Navbar />
      {auth &&
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/profile"  >
            <Route index element={<Profile/>} />
            <Route path="friends" element={<Friends />} />
            <Route path="friends/:id" element={<IndividualQuotes />} />
          </Route>
          <Route path="/createquote" element={<Createquote/>} />
          <Route path="/myqoutes" element={<MyQuotes />} />
          <Route path ="*" element={<NotFound />} />
        </Routes>
      }
      {!auth &&
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path ="*" element={<NotFound />} />
          </Routes>
      }
    </>
  )
}


