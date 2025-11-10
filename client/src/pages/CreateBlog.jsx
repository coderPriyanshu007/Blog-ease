import { useState } from "react";
import { toast } from "react-toastify";
import { submitBlog } from "../api/blogs";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import BlogEditor from "../components/BlogEditor";

const CreateBlog = () => {

  const [adding, setAdding] = useState(false);
  const {token,user} = useAuth();
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id : user?.user_id,
    blog_id: generateBlogId(),
    title: "",
    category: "",
    topic:"",
    body: "",
    author: user?.name
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAdding(true);
    const toastId = toast.loading("Posting blog...");

    try {
      const res = await submitBlog(formData,token); 
      toast.update(toastId, {
        render: res.message || "Blog created!",
        isLoading: false,
        type: "success",
        autoClose: 1500,
        hideProgressBar: true,
      });
      Navigate('/blogs');
    } catch (err) {
      console.error(err.message);
      toast.update(toastId, {
        render: "Failed to add blog",
        isLoading: false,
        type: "error",
        autoClose: 1500,
        hideProgressBar: true,
      });
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 md:px-12">
      <div className="bg-white  mt-8 rounded-xl shadow-lg w-full  p-6">
        <h1 className="text-3xl font-bold text-start text-red-600 mb-8">
          Create New Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex gap-4 ">
    {/* blog ID */}
          <div className="basis-1/3">
            <label htmlFor="blog_id" className="block  text-sm font-medium text-gray-700">
              Blog ID*
            </label>
            <input
              type="text"
              id="blog_id"
              name="blog_id"
              value={formData.blog_id}
              onChange={handleChange}
              required
              maxLength={20}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </div>

          {/* Title */}
          <div className="basis-2/3">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              maxLength={100}
              placeholder="Enter a catchy title here"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </div>
          </div>

          {/* topic */}
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
              topic
            </label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              maxLength={50}
              placeholder="Enter a short topic name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </div>

          {/* category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
              required
            >
              <option value="" disabled>Select a Category</option>
              <option value="Tech">Tech</option>
              <option value="Health">Health</option>
              <option value="Sports">Sports</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Science">Science</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
            </select>
          </div>

         

          {/*  body */}
          <div>
           
            <BlogEditor value={formData.body}  
            onChange={(newValue) => setFormData({ ...formData, body: newValue })} />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={adding}
            className="w-full py-3 px-4 red-gradient text-white font-semibold rounded-md shadow hover:bg-red-700 transition"
          >
            {adding ? "Creating..." : "Create blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

const generateBlogId = () => {
  const months = [
    "JAN","FEB","MAR","APR","MAY","JUN",
    "JUL","AUG","SEP","OCT","NOV","DEC"
  ];
  const now = new Date();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const randomStr = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `BLG-${month}${year}-${randomStr}`;
};

export default CreateBlog;
