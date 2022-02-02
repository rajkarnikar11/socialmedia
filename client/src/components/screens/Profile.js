import React,{useEffect,useState,useContext} from 'react';
import {UserContext} from '../../App'
import '../../styles/Profile.css'
const Profile = () => {
  const [mypics,setPics]=useState([])
  const {state,dispatch}=useContext(UserContext)
  const [image,setImage] = useState("")
  const [url,setUrl] = useState("")
  useEffect(()=>{
    fetch('/mypost',{
      headers:{
        "Authorization":'Bearer '+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>{
      console.log(result)
      setPics(result.mypost)
    })
  },[])
  useEffect(()=>{
    if(image){
      const data = new FormData()
      data.append('file',image)
      data.append('upload_preset','Shutter')
      data.append('cloud_name','dtm704hzn')
      fetch("https://api.cloudinary.com/v1_1/dtm704hzn/image/upload",{
        method:'post',
        body:data
          }).then(res=>res.json())
          .then(data=>{
              // setUrl(data.url)
              // localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
              // dispatch({type:"UPDATEPIC",payload:data.url})
              fetch('/updatepic',{
                method:"put",
                headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                  pic:data.url
                })
              }).then(res=>res.json())
              .then(result=>{
                console.log(result)
                localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                dispatch({type:"UPDATEPIC",payload:result.pic})
                window.location.reload()
              })
              // 
            }).catch(err=>{
              console.log(err)
            })      
    }
  },[image])
  const updatePhoto =(file)=>{
    setImage(file)
    
  }
  return( 
  <div>
      <div className='containerdetail'>
        <div className='profile-container'>
          <img className='profilepic' alt='blank' src={state?state.pic:"loading"}></img>
          <div className='propic-up-container'>
            <h5 className='propic-up-button'>Upload Profile Photo</h5>                        
              <input  className='address'
                  type="file"
                  onChange={(e)=>updatePhoto(e.target.files[0])}/>
          </div>
        </div>
        <div className='infocontainer'>
          <h2>{state?state.name:'loading'}</h2>
          <h5>{state?state.email:'loading'}</h5>
          {/* <h2>salil</h2> */}
          <div className='followcontainer'>
            <h6 className='followtext'>{mypics.length} <br/>  posts</h6>
            <h6 className='followtext'>{state?state.followers.length:"-"} <br/> followers</h6>
            <h6 className='followtext'>{state?state.following.length:"-"} <br/>  following</h6>
          </div> 
        </div>
       
      </div>
      <div className='imagecontainer'>
        {mypics?.length === 0 && (
          <div>
            <span>Loading, Please Wait</span>
          </div>
        )}
        {
          mypics?.length > 0 && mypics?.map(item=>{
            return(
              <div className='img-wrapper'>
                <img key={item._id} className='image' src={item.photo} alt="blank"/>
              </div>
              )
          })
        }
{/*           
          <img className='image' src="https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZmVtYWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="blank"/>
          <img className='image' src="https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZmVtYWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="blank"/>
          <img className='image' src="https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZmVtYWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="blank"/>
          <img className='image' src="https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZmVtYWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="blank"/>
          <img className='image' src="https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZmVtYWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="blank"/> */}
        </div>
  </div>);
};

export default Profile;
