import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

const Appbar = () => {
  return (
    <div className="border-b px-10 flex justify-between mb-10 py-5">
      <div>
        <Link to={"/blogs"}>Medium</Link>
      </div>

      <div>
       <Link to={'/publish'}><button
          type="button"
          className="mr-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          New
        </button></Link> 
        <Avatar name={"Harsh"} />
      </div>
    </div>
  );
};

export default Appbar;
