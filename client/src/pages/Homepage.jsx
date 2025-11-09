import { Link } from "react-router-dom";
import bg from "../assets/bg.png";

import { useAuth } from "../context/AuthContext";
import BlogListing from "../components/BlogListing";

export default function LandingPage() {
  const { user } = useAuth();
  return (
    <main className="min-h-screen flex p-12 flex-col bg-gray-50">
      {/* Hero Section */}
      <div
        className="flex flex-col min-h-[70dvh] items-start justify-center flex-1 px-12 text-start"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Share your thoughts with ease.
        </h2>
        <p className="text-lg text-white max-w-2xl mb-6">
          “A modern space for writers and creators to publish stories, engage
          readers, and grow an audience.”
        </p>
        <div className="space-x-4">
          {!user && (
            <Link
              to="/auth"
              className="red-gradient text-white px-6 py-3 rounded-md font-medium hover:bg-red-600 "
            >
              Get Started
            </Link>
          )}
          <Link
            to="/blogs"
            className="bg-gray-200 text-gray-800  px-6 py-3 rounded-md font-medium hover:bg-gray-300"
          >
            Browse Blogs
          </Link>
        </div>
      </div>

      {/* Recent */}
      <section>
        <BlogListing title="Recent Blogs" />
      </section>

      {/* Popular */}
      <section>
        <BlogListing title="Popular Blogs" />
      </section>
    </main>
  );
}
