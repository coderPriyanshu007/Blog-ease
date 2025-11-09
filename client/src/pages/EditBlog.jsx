import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchBlogById, updateBlog } from "../api/blogs";
import BlogEditor from "../components/BlogEditor";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const EditBlog = () => {
  const { id } = useParams();
  const [updating, setUpdating] = useState(false);
  const [blog, setBlog] = useState();
  const [formData, setFormData] = useState({
    event_id: "",
    title: "",
    category: "",
    topic: "",
    author: "",
    body: "",
  });
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const blog = await fetchBlogById(id, token);
        setBlog(blog);
      } catch (err) {
        console.log(err.message);
      }
    };
    loadBlog();
  }, []);
  useEffect(() => {
    if (blog) {
      setFormData({
        blog_id: blog.blog_id || "",
        title: blog.title || "",
        category: blog.category || "",
        topic: blog.topic || "",
        author: blog.author || "",
        body: blog.body || "",
      });
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const toastId = toast.loading("updating blog...");

    try {
      const res = await updateBlog(formData, token);
      toast.update(toastId, {
        render: "Blog Updated!",
        isLoading: false,
        type: "success",
        autoClose: 1500,
        hideProgressBar: true,
      });
      navigate("/blogs/" + id);
    } catch (err) {
      console.error(err.message);
      toast.update(toastId, {
        render: "Failed to edit blog",
        isLoading: false,
        type: "error",
        autoClose: 1500,
        hideProgressBar: true,
      });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white p-10 mt-8 rounded-xl shadow-lg w-full container-xl md:container ">
        <h1 className="text-3xl font-bold text-start text-red-600 mb-8">
          Create New Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex gap-4 ">
            {/* blog ID */}
            <div className="basis-1/3">
              <label
                htmlFor="blog_id"
                className="block  text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
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
            <label
              htmlFor="topic"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
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
              <option value="" disabled>
                Select a Category
              </option>
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
            {/* <label htmlFor="body" className="block text-sm font-medium text-gray-700">
                      Content
                    </label>
                    <textarea
                      id="body"
                      name="body"
                      value={formData.body}
                      onChange={handleChange}
                      rows="20"
                      maxLength={500}
                      placeholder="Write your blog content here..."
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    ></textarea> */}
            <BlogEditor
              value={formData.body}
              onChange={(newValue) =>
                setFormData({ ...formData, body: newValue })
              }
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={updating}
            className="w-full py-3 px-4 red-gradient  text-white font-semibold rounded-md shadow hover:bg-red-700 transition"
          >
            {updating ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
