import { useState, useEffect } from "react";

import Spinner from "./Spinner";
import { fetchBlogs } from "../api/blogs";
import BlogListingComp from "./BlogListingComp";

const BlogListing = ({ title, searchTerm , selectedCategory, blogList, dashboard}) => {
  const [blogs, setBlogs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(blogList || dashboard) {
      setBlogs(blogList);
      setLoading(false);
      return; 
    }else{
    const loadBlogs = async () => {
      try {
        const blogs = await fetchBlogs();
        let fewBlogs;
        if (title) {
          fewBlogs =
            title === "Recent Blogs"
              ? blogs.slice(0, 6)
              : blogs.sort((a, b) => b.views - a.views).slice(0, 6);
        }
        setBlogs(fewBlogs || blogs);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
      }
    };
    loadBlogs();
  }
  }, [blogList]);

  useEffect(() => {
    if (!searchTerm) return;
    const filteredBlogs = blogs.filter((blog) => {
      const lowerSearch = searchTerm.toLowerCase();
      return (
        blog.title.toLowerCase().includes(lowerSearch) ||
        blog.author.toLowerCase().includes(lowerSearch) ||
        blog.category.toLowerCase().includes(lowerSearch) ||
        blog.topic.toLowerCase().includes(lowerSearch)
      );
    });
    setSearchResults(filteredBlogs);
  }, [searchTerm]);

  useEffect(()=>{
    
    if (selectedCategory !== 'All'){
    const filteredBlogs = blogs.filter((blog) => blog.category.toLowerCase() === selectedCategory.toLowerCase());
    setSearchResults(filteredBlogs);
  }
  },[selectedCategory])

  if(blogs.length===0) return <div className="text-lg text-center mt-20">No blogs yet.</div>

  return (
    <section className="bg-gray-50  py-10">
      <div className="container-xl lg:container m-auto">
        {title ? (
          <h2 className="text-3xl py-2 border-b font-bold text-black mb-6 text-start">
            {title}
          </h2>
        ) : null}

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {searchTerm || (selectedCategory && selectedCategory !== 'All')
              ? searchResults.map((blog) => (
                  <BlogListingComp key={blog.id} blog={blog} />
                ))
              : blogs.map((blog) => (
                  <BlogListingComp key={blog.id} blog={blog} />
                ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogListing;
