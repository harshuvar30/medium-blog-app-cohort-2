import { useParams } from "react-router-dom";
import SingleBlog from "../components/SingleBlog";
import { useBlog } from "../hooks"

 const Blog = () => {
  const { id } = useParams()
  const {loading,blog} = useBlog({id:id || ""});
  if(loading)
  {
    return <div>
      loading 
    </div>
  }
  return (
    <div className="">
      <SingleBlog blog={blog}/>
    </div>
  )
}

export default Blog
