
import writing from "../assets/writing.png";
import { FaEye } from "react-icons/fa";
import  formatViews  from "../utils/formatViews";
import  {formatDate} from "../utils/formatDate";
const BlogList = ({b}) => (
  <div
    
    
    className="block border  group hover:bg-gray-100  p-4 rounded-lg mb-4"
  >
    <h2 className="text-lg font-semibold text-gray-800 group-hover:underline ">
      {b.title}
    </h2>
    <div className="flex flex-row items-end text-gray-600  gap-2 text-sm  py-2">
      <img src={writing} className="w-5" />
      <p>{b.author} </p>
      <span className="text-gray-600">&#x2022;</span>
      <p>{formatDate(b.posted_on)}</p>
      <span className="text-gray-600">&#x2022;</span>
      <div>
        <FaEye className="inline me-2" />
        {formatViews(b.views)}
      </div>
    </div>
  </div>
);

export default BlogList;
