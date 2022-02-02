import React,{useEffect,createContext,useReducer,useContext} from 'react';
import Navbar from './components/Navbar';
import './styles/App.css';

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import Home from './components/screens/Home'
import SubscribedUserPosts  from "./components/screens/SubscribedUserPosts"
import Profile from './components/screens/Profile'
import UserProfile from './components/screens/UserProfile'
import Login from './components/screens/Login'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/Createpost'
import {reducer,initialstate} from './reducers/userReducer'

export const UserContext= createContext()

const Routing = ()=>{
  const {state,dispatch}=useContext(UserContext)
  const navigate=useNavigate()
  useEffect(()=>{
    const user =JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:'USER',payload:user})
      // navigate("/", { replace: true });
    }else{
      // navigate("/login", { replace: true });
    }
  },[])
  return(
    <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/profile" element={<Profile />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/createpost" element={<CreatePost />} />
    <Route path="/profile/:userid" element={<UserProfile />} />
    <Route path="/myfollowerspost" element={<SubscribedUserPosts />} />
  </Routes>
  )
}


function App() {
  const [state,dispatch]= useReducer(reducer,initialstate)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar/>
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
