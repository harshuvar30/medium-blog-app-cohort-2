import { ChangeEvent, useState } from "react";
import Appbar from "../components/Appbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewBlog = () => {
    const [post,setPost] = useState("")
    const [title, setTitle] = useState("")
    const navigate = useNavigate()
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="flex justify-center flex-col max-w-screen-lg w-full ">
          <div className=" max-w-screen-lg w-full ">
            `{" "}
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Post title
            </label>
            <input
            onChange={(e)=>{setTitle(e.target.value)}}
              type="text"
              className="
        bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Title"
            />
            `
            <PostField  onChange={(e)=>{setPost(e.target.value)}}/>
            <button
            onClick={async()=>{
               const response = await axios.post(`https://backend.medium-blog-app.workers.dev/api/v1/blog`,
                    {
                        title,
                        content:post
                    },
                    {headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                    }}
                )
                navigate(`/blog/${response.data.id}`)
            }}
                type="submit"
                className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
                Publish post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function PostField({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void}) {
  return (
    <div>
      <div className=" bg-white  border border-gray-300 ">
        <label className="sr-only">Publish post</label>
        <textarea
          onChange={onChange}
          id="editor"
          rows={8}
          className=" pl-2 pt-2 rounded-lg block w-full px-0 text-sm text-gray-800 bg-white "
          placeholder="Write an article..."
          required
        ></textarea>
      </div>
    </div>
  );
}

export default NewBlog;
