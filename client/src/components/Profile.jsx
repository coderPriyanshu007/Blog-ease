import { useState } from "react";
import { User, Mail, Lock, Save, FileText } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { updateUserProfile } from "../api/user";

export default function Profile() {
  const { user ,token} = useAuth();
  const [updating,setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    bio: user.bio || "",
    password: "",
    newPassword: "",
    confirmPassword: "",
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
    setUpdating(true);
    const toastId = toast.loading("Updating...");
    
    try {
      const res = await updateUserProfile(formData, token);
      toast.update(toastId, {
        render: res.message || "Profile Updated!",
        isLoading: false,
        type: "success",
        autoClose: 1500,
        hideProgressBar: true,
      });
     
    } catch (err) {
      console.error(err.message);
      toast.update(toastId, {
        render: err.message || "Failed to update profile",
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
            readOnly
              type="email"
              name="email"
              value={user.email}
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
            {formData.confirmPassword &&
              formData.confirmPassword !== formData.newPassword && (
                <div className="text-red-500">
                  Passwords don't match. Enter same new passwords.
                </div>
              )}
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={
            (formData.newPassword && !formData.password) ||
            formData.newPassword !== formData.confirmPassword
          }
          className="w-full mt-6 red-gradient  text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Save size={18} />
          {!updating?'Save Changes':'Saving...'}
        </button>
      </form>
    </div>
  );
}
