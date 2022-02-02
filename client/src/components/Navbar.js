import React,{useContext} from 'react';
import '../styles/Navbar.css'
import { Link,useNavigate } from 'react-router-dom'
import {UserContext} from '../App'
const Navbar = () => {
  const navigate=useNavigate()
  const {state,dispatch}=useContext(UserContext)
    const renderList=()=>{
      if(state){
        return [
          <Link className='nav-items' to='/profile'><li>Profile</li></Link>,
          <Link className='nav-items' to='/createpost'><li >Create Post</li></Link>,
          <Link className='nav-items' to='/myfollowerspost'><li >following post</li></Link>,
          <li >
            <button className='nav-logout' onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              navigate("/login", { replace: true });
              }} >Log out
            </button>  
          </li>
        ]
      }
      return[ 
          <Link className='nav-items' to='/login'><li >Login</li></Link>,
          <Link className='nav-items' to='/signup'><li >Signup</li></Link>
      ]
    }
  
  return (
    <div className='container'>
        <ul className="list-container">
            <li >
            <Link className='nav-logo'  to={state?'/':'/login'}>logo</Link>
            </li>
            <li>
                <ul className="list-container-right">
                    {renderList()}
                </ul> 
            </li>
        </ul>
    </div>
  );
};

export default Navbar;
