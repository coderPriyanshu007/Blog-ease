import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import writing from "../assets/writing.png";
import { FaEye } from "react-icons/fa";
import formatViews from "../utils/formatViews";
import {
  deleteBlog,
  fetchBlogById,
  fetchBlogs,
  
} from "../api/blogs";
import { formatDate } from "../utils/formatDate";
import BlogList from "../components/BlogList";


const BlogPage = () => {
  const { id } = useParams();
  const { token, user } = useAuth();
  const [blog, setblog] = useState();
  const [relatedBlogs, setRelatedBlogs] = useState();
  const [moreByAuthor, setMoreByAuthor] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadblog = async () => {
      if(!loading) setLoading(true);
      try {
        const blog = await fetchBlogById(id, token);

        setblog(blog);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadblog();
  }, [id]);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const blogs = await fetchBlogs();
        setMoreByAuthor(
          blogs
            .filter((b) => b.author === blog.author && b.id !== blog.id)
            .slice(0, 5)
        );
        setRelatedBlogs(
          blogs
            .filter((b) => b.category === blog.category && b.id !== blog.id)
            .slice(0, 5)
        );
        setLoading(false);
      } catch (err) {
        console.error(err.message);
      }
    };

    loadBlogs();
  }, [blog]);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete blog?");
    if (!confirm) return;
    const toastId = toast.loading("Deleting....");
    try {
      const res = await deleteBlog(blog.blog_id, token);
      toast.update(toastId, {
        render: "blog Deleted Successfully!",
        isLoading: false,
        type: "success",
        autoClose: 1500,
      });
      navigate("/blogs");
    } catch (err) {
      console.error(err.message);
      toast.update(toastId, {
        render: "Failed to Delete blog",
        isLoading: false,
        type: "error",
        autoClose: 1500,
      });
    }
  };

  return (
    <>
      <section>
        <div className="  m-auto py-6 px-4 md:px-12">
          <Link
            to="/blogs"
            className=" rounded-md px-4 py-1 border-transparent text-black  inline-flex items-center hover:border-solid  hover:text-red-500 hover:border-red-500 border-2"
          >
            <FaArrowLeft className="mr-2 " /> Back
          </Link>
        </div>
      </section>

      {loading ? (
        <div className="min-h-screen">
            <Spinner loading={loading} />
        </div>
      ) : (
        <section className="bg-gray-50 min-h-screen">
          <div className="xl:container m-auto py-10 px-4 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-70/30 w-full gap-6">
              <main>
                <div className="bg-white p-6 rounded-lg shadow-md text-left">
                  <div className="text-gray-500 mb-4">{blog.category}</div>
                  <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
                  <div className="flex flex-row items-end text-gray-600  gap-2 text-sm  py-2">
                    <img src={writing} className="w-5" />
                    <p>{blog.author} </p>
                    <span className="text-gray-600">&#x2022;</span>
                    <p>{formatDate(blog.posted_on)}</p>
                    <span className="text-gray-600">&#x2022;</span>
                    <div>
                      <FaEye className="inline me-2" />
                      {formatViews(blog.views)}
                    </div>
                  </div>
                </div>

                <div className="prose min-w-[100%] bg-white p-6 rounded-lg break-words text-wrap shadow-md mt-6">
                  <div dangerouslySetInnerHTML={{ __html: blog.body }}></div>
                </div>
              </main>

              <aside>
                {/* manage blogs */}
                {user.user_id === blog.user_id && (
                  <div className="bg-white p-6 rounded-lg shadow-md mb-8 ">
                    <h1 className="text-xl font-bold mb-6">Manage blog</h1>
                    <Link
                      to={`/edit-blog/${blog.id}`}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                    >
                      Edit blog
                    </Link>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                      onClick={handleDelete}
                    >
                      Delete blog
                    </button>
                  </div>
                )}

                {/* related blogs */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8 ">
                  <h1 className="text-xl font-bold mb-6">Related blogs</h1>
                  {relatedBlogs && relatedBlogs.length > 0 ? (
                    relatedBlogs.map((b) => (<Link to={`/blogs/${b.id}`}><BlogList b={b} key={b.id} /></Link>))
                  ) : (
                    <p>No related blogs found.</p>
                  )}
                </div>

                {/*More by this author  */}

                <div className="bg-white p-6 rounded-lg shadow-md  ">
                  <h1 className="text-xl font-bold mb-6">
                    More blogs by the author
                  </h1>
                  {moreByAuthor && moreByAuthor.length > 0 ? (
                    moreByAuthor.map((b) => (<Link to={`/blogs/${b.id}`}><BlogList b={b} key={b.id} /></Link>))
                  ) : (
                    <p>No related blogs found.</p>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BlogPage;
