import React,{useState,useEffect,useContext} from 'react';
import '../../styles/Home.css'
import {Link} from 'react-router-dom'
import {UserContext} from '../../App'
const Home = () => {
  // const [heart,setHeart]=useState(0);
  const [data,setData] = useState([])
  const {state,dispatch}=useContext(UserContext)
  // const handleToggle = () => {
  //   setHeart(!heart);  };
  useEffect(()=>{
    fetch('/getsubpost',{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>{
      console.log(result.posts)
      setData(result.posts)
    })  
  })
  const unlikePost=(id)=>{
    fetch('/unlike',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":'Bearer '+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id
      })
    }).then(res=>res.json())
    .then(result=>{
      const newData=data.map(item=>{
        if(item._id==result._id){
          return result
        }
        else{
          return item
        }
      })
      setData(newData)
      console.log(result)
    })  
  }
  const likePost=(id)=>{
    fetch('/like',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":'Bearer '+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id
      })
    }).then(res=>res.json())
    .then(result=>{
      const newData=data.map(item=>{
        if(item._id==result._id){
          return result
        }
        else{
          return item
        }
      })
      setData(newData)
      console.log(result)
      
    })  
  }
  const makeComment =(text,postId)=>{
    fetch('/comment',{
      method:'post',
      headers:{
        "Content-Type":'application/json',
        "Authorization":'Bearer '+localStorage.getItem("jwt")

      },
      body:JSON.stringify({
        postId,
        text
      })
    }).then(res=>res.json())
    .then(result=>{
      const newData=data.map(item=>{
        if(item._id===result._id){
          return result
        }
        else{
          return item
        }
      })
      setData(newData)
      console.log(result)
    })
    
  }
  const deletePost=(postId)=>{
      fetch(`/deletepost/${postId}`,{
          method:'delete',
          headers:{
            Authorization:"Bearer "+localStorage.getItem('jwt')
          }
      }).then(res=>res.json())
      .then(result=>{
        console.log(result)
        const newData= data.filter(item=>{
          return item.id_id !== result.id
        })
        setData(newData)
      })
  }
  return  (
    <div>
      {data?.length === 0 && (
          <div>
            <span>Loading, Please Wait</span>
          </div>
        )}
      {
        data?.length > 0 && data?.map(item=>{
          return(
            <div className='home-container'>
              <div className='name-container'>
                <Link style={{ textDecoration: 'none'}} to={item.postedBy._id !== state._id? '/profile/'+ item.postedBy._id :  '/profile'}><h5 className='home-name'>{item.postedBy.name}</h5></Link>
                {item.postedBy._id===state._id
                  &&  
                  <i className={"material-icons "+"delete-icon" }
                   onClick={()=>deletePost(item._id)}>
                  delete_forever
                </i>
                  }  
              </div>
              <div className='card-image-container'>
                <img className='card-image'  alt="blank" src={item.photo} />
              </div>
              <div className='card-content'>
                {/* <div onClick={handleToggle}>
                 {heart ?<i onClick={()=>{unlikePost(item._id)}} className={"material-icons " + "full"} >favorite</i>:<i onClick={()=>{likePost(item._id)}} className={"material-icons " +'full'} >favorite_border</i> }
                </div> */}
                
                {item.likes.includes(state._id)
                ? <i  className="material-icons " 
                    onClick={()=>{unlikePost(item._id)}}
                    style={{cursor:"pointer",color:'crimson'}} >favorite</i>
                :  <i  className="material-icons "
                onClick={()=>{likePost(item._id)}} 
                style={{cursor:"pointer"}} >favorite_border</i>}
                
               
                
                <h6 className='home-card-likes'>{item.likes.length} likes</h6>
                <h6 className='home-card-title'>{item.title} </h6>
                <p className='home-card-desc'>{item.body}</p>
                <div >
                  {
                    item.comments.map(record=>{
                      return(
                        <h6 key={record._id}><span ><Link style={{ textDecoration: 'none',color:'black'}} to={item.postedBy._id !== state._id? '/profile/'+ item.postedBy._id :  '/profile'}>{record.postedBy.name}</Link></span><span style={{fontWeight:'500'}}> {record.text}</span></h6>
                      )
                    })
                  }
                </div>
                <form onSubmit={(e)=>{
                  e.preventDefault()  
                  makeComment(e.target[0].value,item._id)
                }}> 
                  <input className='home-comment' type="text" placeholder='add a comment'/>
                </form>
              </div>
            </div>
          )
        })
      }
      
     
    </div>
  );
};

export default Home;
