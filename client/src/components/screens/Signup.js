import React,{useState,useEffect} from 'react';
import '../../styles/Login.css'
import {Link, useNavigate} from 'react-router-dom'
const Signup = () => {
  const navigate = useNavigate()
  const [name,setName]=useState("")  
  const [password,setPassword]=useState("")
  const [email,setEmail]=useState("")
  const [image,setImage] = useState("")
  const [url,setUrl] = useState(undefined)
  useEffect(()=>{
    if(url){
      uploadFields()
    }
  },[url])
  const uploadPic=()=>{
    const data = new FormData()
    data.append('file',image)
    data.append('upload_preset','Shutter')
    data.append('cloud_name','dtm704hzn')
    fetch("https://api.cloudinary.com/v1_1/dtm704hzn/image/upload",{
      method:'post',
      body:data
         }).then(res=>res.json())
         .then(data=>{
            setUrl(data.url)
          }).catch(err=>{
            console.log(err)
          })      
  }
  const uploadFields=()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      alert('invalid email');
      return 
    }
      fetch('/signup',{
        method:'post',
        headers:{
          "Content-Type":"application/json"

        },
        body:JSON.stringify({
          name,
          password,
          email,
          pic:url
        })
      }).then(res=>res.json())
      .then(data=>{
        if(data.error){
          alert(data.error);
        }  
        else{
          
          navigate("../login", { replace: true });
        }   
       }).catch(err=>{
         console.log(err)
       })
  }
  const PostData=()=>{
    if(image){
      uploadPic()
    }else{
      uploadFields()    }
    
  }
  return (
  <div >
      <div className='cardContainer'>
        <h2> logo </h2>
        <div className='detailcontainer'>
          <input className='text'
          type="text"
          placeholder='username'
          value={name}
          onChange={(e)=>setName(e.target.value)}
          />
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
          <div className='propic-up-container'>
            <h5 className='propic-up-button'>Upload Profile Photo</h5>                        
              <input  className='address'
                  type="file"
                  onChange={(e)=>setImage(e.target.files[0])}/>
          </div>
          <button onClick={()=>PostData()} className='button'>
            signup
          </button>
          <h5 className='linkcontainer'>
            <Link className='link' to="/login">Already have an account? </Link>
          </h5>
        </div>
      </div>
  </div>);
};

export default Signup;
