import { useState ,useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchBlogs } from "../api/blogs";
import { Home, List, User, Settings } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import BlogsPage from "./BlogsPage";
import Profile from "../components/Profile";

export default function Dashboard() {
  const [active, setActive] = useState("Dashboard");
  const [blogs,setBlogs] = useState([]);
  const menuItems = [
    { icon: Home, label: "Dashboard" },
    { icon: List, label: "My Blogs" },
    { icon: User, label: "Profile" },
  ];


  const { user } = useAuth();
  
    useEffect(() => {
        const loadBlogs = async () => {
          try {
            const blogs = await fetchBlogs();
            setBlogs(  blogs.filter(b=> b.author === user.name ) );
          
          } catch (err) {
            console.error(err.message);
          }
        };
        loadBlogs();
      }, []);



  return (
    <div className="min-h-screen bg-gray-50  ">
      <div className="h-full">
        <div className={` stick  px-4  md:px-12 red-gradient top-0 mb-4  w-full text-white }`}>
          <div className=" flex  py-4  space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setActive(item.label)}
                className={`${
                  active === item.label ? "bg-white/20" : "bg-transparent"
                } w-full flex items-center justify-center md:justify-start gap-3 px-6 py-2 text-sm font-medium hover:bg-white/20 transition rounded-lg`}
              >
                <item.icon className="h-5 w-5" />
                <span className="hidden md:inline">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* dashboard */}
        {
          active === "Dashboard" && <DashboardLayout blogs={blogs} />
        }

        {/* mybblogs */}
        {
          active === "My Blogs" && <BlogsPage blogs={blogs} />
        }
        {/* Profile */}
        {
          active === "Profile" && <Profile />
        }
      </div>
    </div>
  );
}
