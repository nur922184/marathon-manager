import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { toast,} from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
  
const UpdateProfile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user.displayName || "");
  const [photoURL, setPhotoURL] = useState(user.photoURL || "");
  const navigate = useNavigate();

  const handleUpdate = async () => {
    try {
      await updateProfile(user, { displayName: name, photoURL });
      toast.success("Profile updated successfully! 🎉");
    //   alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-12">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-700 dark:text-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Update Profile
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600 dark:text-gray-400 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 dark:bg-gray-500 rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="photoURL" className="block text-gray-600 mb-1 dark:text-gray-400">
              Photo URL
            </label>
            <input
              id="photoURL"
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full border border-gray-300 dark:bg-gray-500 rounded-lg p-2"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
          >
            Update Information
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateProfile;
