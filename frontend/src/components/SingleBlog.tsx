import { Blog } from "../hooks"
import Appbar from "./Appbar"
import { Avatar } from "./BlogCard"

const SingleBlog = ({blog}:{blog:Blog }) => {
  return <div>
        <Appbar/>
        <div className="flex justify-center">
              <div className="grid grid-cols-12 w-full px-10 pt-12 max-w-screen-xl">
              <div className="col-span-8 ">
                <div className="text-5xl font-extrabold ">
                      {blog.title}
                </div>
                <div className="text-slate-400 pt-2">
                  Posted on 29th March, 2025
                </div>
                <div className="text-slate-600 pt-4">
                  {blog.content}
                </div>
              </div>
                <div className="col-span-4">
                  Author
                  <div className="flex justify-center pt-2">
                   <div className="flex flex-col justify-center pr-4">
                    <Avatar name={blog.author.name || "Anonymous"}/>
                    </div> 
                    <div className="px-2">
                      <div className="text-xl font-bold"> 
                        {blog.author.name || "Anonymous"}
                      </div>
                      <div className="pt-2 text-slate-500">
                        Random catch phrase about authors ability to granb the user's attention
                      </div> 
                    </div>
                  </div>
                </div>
              
          </div>
        </div>
        </div>
  
}

export default SingleBlog