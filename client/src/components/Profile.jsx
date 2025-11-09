import { useState } from "react";
import { User, Mail, Lock, Save, FileText } from "lucide-react";

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Replace with backend API call
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 mt-10 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Profile Settings
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Update your personal information, bio, and password
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            Name
          </label>
          <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700">
            <User className="text-gray-400 mr-2" size={18} />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-white"
              placeholder="Enter your name"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            Email
          </label>
          <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700">
            <Mail className="text-gray-400 mr-2" size={18} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-white"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            Bio
          </label>
          <div className="flex items-start bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700">
            <FileText className="text-gray-400 mt-1 mr-2" size={18} />
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              className="w-full bg-transparent resize-none focus:outline-none text-gray-800 dark:text-white"
              placeholder="Tell something about yourself..."
            />
          </div>
        </div>

        {/* Password Change Section */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Change Password
          </h2>

          <div className="space-y-3">
            {["password", "newPassword", "confirmPassword"].map((field, i) => (
              <div
                key={i}
                className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700"
              >
                <Lock className="text-gray-400 mr-2" size={18} />
                <input
                  type="password"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-white"
                  placeholder={
                    field === "password"
                      ? "Current password"
                      : field === "newPassword"
                      ? "New password"
                      : "Confirm new password"
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-rose-500 to-red-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Save size={18} />
          Save Changes
        </button>
      </form>
    </div>
  );
}
