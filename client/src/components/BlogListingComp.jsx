import { formatDate } from "../utils/formatDate";
import { FaEye } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import striptags from "striptags";
import { Link } from "react-router-dom";
import writing from "../assets/writing.png";
import formatViews from "../utils/formatViews";

const BlogListingComp = ({ blog }) => {
  const body = blog.body;
  const description = striptags(body.slice(body.indexOf("<p>"), 250)) + "...";

  return (
    <div className="bg-white shadow-md group  hover:shadow-lg relative">
      <div className="p-4 h-full flex flex-col justify-between">
        <div className="mb-6">
          <div className="flex flex-row justify-between items-center mb-2">
            <div className="text-blue-600 playwrite text-sm my-2">
              {blog.category}
            </div>
          </div>
          <h1 className="text-xl font-semibold group-hover:underline text-black ">
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </h1>
          <div className=" text-xs text-gray-600 mt-2  playwrite">
            Topic : {blog.topic}
          </div>
        </div>

        <p className="mb-5 text-md text-gray-600 text-light break-words  ">{description}</p>

        <div className="border border-gray-100 mb-2"></div>

        <div className="flex flex-row items-end text-gray-600  gap-2 text-sm  py-2">
          <img src={writing} className="w-5" />
          <p>{blog.author} </p>
          <span className="text-gray-600">&#x2022;</span>
          <p>{formatDate(blog.posted_on)}</p>
          <div className="ms-auto">
            <FaEye className="inline me-2" />
            {formatViews(blog.views)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogListingComp;
