import { Link } from "react-router-dom"


interface BlogCardProps {
    id:string,
    authorName:string,
    title:string,
    content:string,
    publishedDate:string
}
const BlogCard = ({id,authorName,title,content,publishedDate}:BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
    <div className="border-b border-slate-200 pb-4 p-4 w-screen max-w-screen-md cursor-pointer">
        
       <div className="flex"> 
        <Avatar name={authorName}/>
        <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{authorName}</div>
       <div className="flex justify-center flex-col ">
        <div className="pl-2 font-extrabold ">
            .
        </div>
        </div>
        <div className="text-slate-400 pl-2 text-sm flex justify-center flex-col">{publishedDate}</div>
        </div> 
        <div className="text-xl font-semibold pt-2">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0,100) + "..."}
        </div>
        <div className="text-slate-400 text-sm pt-4">
           { `${Math.ceil(content.length/100)} minutes`}
        </div>
    </div>
</Link>
  )
}

export function Avatar({name}:{name:string}){
    return <div className="flex-col relative inline-flex items-center justify-center 
    w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className=" font-xs text-gray-600 dark:text-gray-300">{name[0].toLowerCase()}</span>
</div>
};

// export default Avatar

export default BlogCard