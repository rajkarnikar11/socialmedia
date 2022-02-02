import React,{useEffect,useState,useContext} from 'react';
import { useParams,Link } from 'react-router-dom';
import {UserContext} from '../../App';

import '../../styles/Profile.css'

const UserProfile =()=> {
  
  const [userProfile,setProfile]=useState(null)
  const {state,dispatch}=useContext(UserContext)
   const {userid} = useParams()
   const [showfollow,setShowfollow]=useState(state?!state.following.includes(userid):true)
 
  useEffect(()=>{
    fetch(`/user/${userid}`,{
      headers:{
        "Authorization":'Bearer '+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>{
    //  console.log(result) 
      
     setProfile(result)
    })
  },[])
  const followUser=()=>{
    fetch('/follow',{
      method:'put',
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer " + localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        followId:userid
      })
    }).then(res=>res.json())
      .then(data=>{
        console.log(data)
        dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
        localStorage.setItem("user",JSON.stringify(data))
        setProfile((prevState)=>{
          return {
            ...prevState,
            user:{
              ...prevState.user,
              followers:[...prevState.user.followers,data._id]
            }
          } 
        })
        setShowfollow(false)
      })
        
  }
  const unfollowUser=()=>{
    fetch('/unfollow',{
      method:'put',
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer " + localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        unfollowId:userid
      })
    }).then(res=>res.json())
      .then(data=>{
        console.log(data)
        dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
        localStorage.setItem("user",JSON.stringify(data))
        
        setProfile((prevState)=>{
          const newFollower = prevState.user.followers.filter(item=>item !== data._id)
          return {
            ...prevState,
            user:{
              ...prevState.user,
              followers:newFollower
            }
          } 
        })
        setShowfollow(true)  
      })
        
  }
  if (!userProfile) { return null; }
  return( 
  <div>
      <div className='containerdetail'>
        <div>
          <img className='profilepic' alt='blank' src={userProfile.user.pic}></img>
        </div>
        <div className='infocontainer'>
          
          <h2>{userProfile.user.name}</h2>
          <h4>{userProfile.user.email}</h4>
          {/* <h2>{userProfile.user.name}</h2>
          <h5>{userProfile.user.email}</h5>  */}
          {/* <h2>salil</h2> */}
          <div className='followcontainer'>
            {/* <h6 className='followtext'>40s</h6> */}
            <h6 className='followtext'>{userProfile.posts.length} <br/> posts</h6>
            <h6 className='followtext'>{userProfile.user.followers.length}  <br/> followers</h6>
            <h6 className='followtext'>{userProfile.user.following.length}  <br/> following</h6>
          </div>
            {(state) 
            &&
              <div>
                {showfollow?
                <div className='follow-button' 
                  onClick={()=>followUser()}>
                    FOLLOW
                </div>
                :
                <div className='follow-button' 
                  onClick={()=>unfollowUser()}>
                    UNFOLLOW
            </div>}
            
          </div>}
          {(!state) 
            &&
           
            <div className='log-button-container'>  
              <Link  className='log-button'  to='/login'>LOGIN</Link>
            </div>
            
          }
         
        </div>
       
      </div>
      <div className='imagecontainer'>
        {userProfile?.length === 0 && (
          <div>
            <span>Loading, Please Wait</span>
          </div>
        )}
        {
          userProfile.posts.map(item=>{
            return(
              <div className='img-wrapper'>
                <img key={item._id} className='image' src={item.photo} alt={item.title}/>
              </div>
              )
          })
        }

        </div>
  </div>);
};

export default UserProfile;
