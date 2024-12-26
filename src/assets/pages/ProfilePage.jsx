import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const ProfilePage = () => {
      const { user } = useContext(AuthContext);
      const navigate = useNavigate();
  return (
    <section className="bg-gray-100 py-12 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 dark:text-white shadow-md rounded-lg p-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="relative">
            <img
              className="w-24 h-24 rounded-full border-4 border-blue-500"
              src={user.photoURL || "https://via.placeholder.com/150"}
              alt="User Profile"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-yellow-50">{user.displayName}</h2>
            <p className="text-gray-600 dark:text-blue-300">{user.email}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-xl font-semibold dark:text-gray-200 text-gray-800 mb-4">Profile Details</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Name:</span>
              <span className="text-gray-800 dark:text-gray-300">{user.displayName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Email:</span>
              <span className="text-gray-800 dark:text-gray-300">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Phone:</span>
              <span className="text-gray-800 dark:text-gray-300">{user.phone || "Not Provided"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Address:</span>
              <span className="text-gray-800 dark:text-gray-300">{user.address || "Not Provided"}</span>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={() => navigate("/update-profile")}
          className="btn btn-primary"
        >
          Update Profile
        </button>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
