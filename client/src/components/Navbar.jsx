// src/components/Navbar.jsx
import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { FaTicketAlt, FaUserCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  const username = user?.name.split(" ")[0];

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white bg-gray-800 font-bold  rounded-full px-4 py-2"
      : "text-black font-bold hover:text-black hover:bg-gray-200  rounded-full px-4 py-2 transition-colors duration-300 ease-in";

  return (
    <nav className=" sticky top-0 z-10 backdrop-blur-lg w-full ">
      <div className=" container-xl lg:container mx-auto">
        <div className="flex h-20 items-center justify-start relative">
          {/* Logo */}
          <NavLink to="/" className="flex items-center mr-4">
            <span className="hidden md:block text-black text-2xl font-extrabold">
              <span className="text-red-500">Blog</span>{" "}
              <span className="text-gray-800">Ease</span>
            </span>
          </NavLink>

          {/* Primary Links */}
          <div className="flex ms-2 space-x-4">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/blogs" className={linkClass}>
              Explore
            </NavLink>
          </div>

          <div className="flex ms-auto items-center space-x-4">
            {/* Profile Dropdown */}
            {user ? (
              <div className=" relative  flex items-center" ref={menuRef}>
                
                <button
                  onClick={() => setOpen((o) => !o)}
                  className="flex items-center gap-2 border px-4 hover:bg-gray-100  rounded-full py-2   text-white focus:outline-none"
                >
                  <span className="text-gray-700 text-lg font-semibold playfair">{username}</span> <FaUserCircle className="text-2xl text-black" />
                </button>
                <AnimatePresence>
                  {open && (
                    <motion.div
                      key="dropdown"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="origin-top-right absolute right-0 top-[100%]  mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-md text-start playfair text-gray-700">Hi, &nbsp;
                        <span className="font-semibold text-md  text-indigo-500">
                          {username} 😊
                        </span>
                        </p>
                      </div>

                      <NavLink
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setOpen(false)}
                      >
                        <MdDashboard className="mr-2" /> Dashboard
                      </NavLink>

                      <button
                        onClick={() => {
                          logout();
                          setOpen(false);
                          navigate("/auth");
                        }}
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-red-500 hover:text-white hover:bg-red-600/90"
                      >
                        <FiLogOut className="mr-2" /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                to="/auth"
                className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg transition-colors duration-300 ease-in"
              >
                Get Started
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
