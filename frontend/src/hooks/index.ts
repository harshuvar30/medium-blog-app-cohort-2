import axios from "axios";
import { useEffect, useState } from "react"
export interface Blog{
    id:string,
    title:string,
    content:string,
    author:{
        name:string
    }
}
export const useBlog = ({id}:{id:string})=>{
    const [loading,setLoading]    = useState(true);
    const [blog,setBlog] = useState<Blog | undefined>();
   
    useEffect(()=>{
       axios.get(`http://127.0.0.1:8787/api/v1/blog/${id}`,{headers:{
           'Authorization':`Bearer ${localStorage.getItem('token')}`
       }})
       .then(response=>{
           setBlog(response.data || "Blog not found!")
           setLoading(false)
       })
   },[id])
   
   return {
       loading,
       blog
   } 
}


export const useBlogs = () =>{
 const [loading,setLoading]    = useState(true);
 const [blogs,setBlogs] = useState([]);

 useEffect(()=>{
    axios.get(`http://127.0.0.1:8787/api/v1/blog`,{headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`
    }})
    .then(response=>{
        setBlogs(response.data)
        setLoading(false)
    })
},[])

return {
    loading,
    blogs
}

}