import BlogListing from "../components/BlogListing";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const BlogsPage = ({blogs}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const categories = [
    "All",
    "Tech",
    "Health",
    "Finance",
    "Travel",
    "Food",
    "Lifestyle",
    "Science",
    "Sports",
    "Education",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");
  return (
    <main className="min-h-screen">
      <div className=" flex items-center text-lg playfair m-4 md:mx-12  p-4 mb-4 rounded-md border m-auto ">
        <FaSearch className="inline me-2 text-gray-500 text-lg " />
        <input
          className="outline-none bg-transparent w-full "
          type="search"
          name="search_blogs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for Topics , Authors , Categories etc..."
        />
      </div>
      <div className=" px-4 md:px-12 m-auto flex gap-4 flex-wrap py-4">
        {categories.map((cat, i) => (
          <button
            key={i}
            name={cat.toLowerCase()}
            
            className={`${
              selectedCategory === cat
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-black"
            }  px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-300 ease-in`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <BlogListing blogList={blogs} searchTerm={searchTerm} selectedCategory={selectedCategory} />
    </main>
  );
};

export default BlogsPage;
