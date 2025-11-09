

import { FaUserCircle } from "react-icons/fa";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";
import { FilePlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

import BlogsPage from "../pages/BlogsPage";

const DashboardLayout = ({blogs}) => {
    
  const {user} = useAuth();

  return (
    <>
    <div className="mt-8  border-b py-2">
      <div className="flex gap-2 items-center py-2">
        <FaUserCircle className="h-full  w-16 text-gray-600 " />
        <h1 className="text-4xl text-gray-800  playwrite font-bold p-4">
          <span className="text-red-500">Welcome</span>, {user.name}{" "}
          <p  className="text-gray-600 text-sm font-normal mt-4">
            Member since : {formatDate(user.joined_on)}
          </p>
        </h1>
        <Link to="/create-blog" className="px-4 p-2 red-gradient font-bold text-white drop-shadow-lg ms-auto  rounded-md"> <FilePlus className="inline h-5 w-5" /> Create Blog</Link>
      </div>
      
    </div>
    {/* analytics */}
      <div className="flex gap-8 my-8">
        <div className="bg-gray-100 text-2xl  h-36 flex flex-col justify-center items center rounded-md drop-shadow-xl flex-1 text-black font-bold text-center">
            <h1>Blogs Posted</h1>
            {
                blogs.length
            }
        </div>
        <div className="bg-gray-100 text-2xl  h-36 flex flex-col justify-center items center rounded-md drop-shadow-xl flex-1 text-black font-bold text-center">
            <h1>Total Views</h1>
            {
                blogs.reduce((acc,blog) => acc + blog.views , 0)
            }
        </div>
       
      </div>
      <h1 className="text-3xl mb-8">Recently Posted</h1>
        <BlogsPage blogs={blogs.slice(0,6)} dashboard={true} />  
      
      </>
  );
};

export default DashboardLayout;
