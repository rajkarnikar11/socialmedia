import React,{useState,useContext} from 'react';
import '../../styles/Login.css'
import {Link, useNavigate} from 'react-router-dom'

import {UserContext} from '../../App'

const Login = () => {
  const{state,dispatch}=useContext(UserContext)
  const navigate = useNavigate()
   const [password,setPassword]=useState("")
  const [email,setEmail]=useState("")
  const PostData=()=>{
    
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      alert('invalid email');
      return 
    }
      fetch('/signin',{
        method:'post',
        headers:{
          "Content-Type":"application/json"
          

        },
        body:JSON.stringify({
         
          password,
          email
        })
      }).then(res=>res.json())
      .then(data=>{
        console.log(data)
        if(data.error){
          alert(data.error);
        }  
        else{
          localStorage.setItem('jwt',data.token)
          localStorage.setItem('user',JSON.stringify(data.user))
          dispatch({type:'USER',payload:data.user})
          navigate("../", { replace: true });
        }   
       }).catch(err=>{
         console.log(err)
       })
  }
  return (
  <div >
      <div className='cardContainer'>
        <h2> logo </h2>
        <div className='detailcontainer'>
        <input className='text'
          type="text"
          placeholder='email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
          <input  className='text'
          type="password"
          placeholder='password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
          <button className='button'
          onClick={()=>PostData()}>
            Login
          </button>
          <h5 className='linkcontainer'>
            <Link className='link' to="/signup">Don't have an account? </Link>
          </h5>
        </div>
      </div>
  </div>);
};

export default Login;
