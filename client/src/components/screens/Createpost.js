import React,{useState ,useEffect} from 'react';
import { useNavigate} from 'react-router-dom'
import '../../styles/createpost.css'
const Createpost = () => {
    const navigate = useNavigate()
    const[title,setTitle]=useState("")
    const[body,setBody]=useState("")
    const[image,setImage]=useState("")
    const[url,setUrl]=useState("")
    useEffect(()=>{
      if(url){
      fetch("/createpost",{
          method:'post',
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")

          },
          body:JSON.stringify({
          
            title,
            body,
            pic:url
          })
        }).then(res=>res.json())
        .then(data=>{
          console.log(data)
          if(data.error){
            alert(data.error);
          }  
          else{
            
            navigate("/", { replace: true });
          }   
        }).catch(err=>{
          console.log(err)
        })
      } 
      },[url])
      const postDetails=()=>{
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
  return( 
    <div className='create-container'>
    <div className='create-post-container'>
            <input className='create-input'
             type="text" placeholder="title"
             value={title}
             onChange={(e)=>setTitle(e.target.value)}
             />
            <input className='create-input'
                type="text" 
                placeholder="caption"
                value={body}
                onChange={(e)=>setBody(e.target.value)} />
            <div className='input-container'>
                <div className='up-button'>
                    <h5 className='up-text'>Upload photo</h5>                        
                    <input  className='input-file'
                         type="file"
                         onChange={(e)=>setImage(e.target.files[0])}/>

                    
                </div>
                {/* <div className='file-path-wrapper'>
                    <input className='file-path' type='text'></input>
                </div> */}
                <div className='submit-button'
                    onClick={()=>postDetails()}>
                    Post
                </div>
            </div>
                

        </div>
    </div>
  );
};

export default Createpost;
